import { combineReducers } from 'redux'
import { normalize } from 'normalizr'
import _ from 'lodash'

import {
  RECEIVE_PHOTOS, SELECT_PHOTO,
  CANCEL_REQUEST, DISPLAY_PHOTOS,
  RESET_STATE
} from '../actions'
import { entitySchema, formatData, userMergeStrategy } from '../store/schema'

function selectedPhoto(state = null, action) {
  switch (action.type) {
    case RESET_STATE:
      return null
    case SELECT_PHOTO:
      return action.photoId
    default:
      return state
  }
}

function isFetching(state = {}, action) {
  switch (action.type) {
    case RESET_STATE:
      return {}
    case SELECT_PHOTO:
      return { photos: true, likes: true }
    case RECEIVE_PHOTOS:
      if (action.from === "user photos") {
        return { ...state, photos: false }
      } else if (action.from === "user likes") {
        return { ...state, likes: false }
      } else {
        return state
      }
    case CANCEL_REQUEST:
      return { photos: false, likes: false }
    default:
      return state
  }
}

function users(state = {}, action) {
  return _.mergeWith({}, state, action, userMergeStrategy)
}

function photos(state = {}, action) {
  return { ...action, ...state }
}

function markPhotosAsDisplayed(state, photoIds) {
  const newPhotos = _.map(photoIds, (photoId) => {
    return {
      [photoId]: {
        ...state[photoId],
        displayed: true
      }
    }
  })
  const newPhotosDict = Object.assign({}, ...newPhotos)
  return {
    ...state,
    ...newPhotosDict
  }
}

function entities(state = {}, action) {
  switch (action.type) {
    case RESET_STATE:
      return {}
    case DISPLAY_PHOTOS:
      return {
        ...state,
        photos: markPhotosAsDisplayed(state.photos, action.photoIds)
      }
    case SELECT_PHOTO:
      return {
        ...state,
        photos: markPhotosAsDisplayed(state.photos, [action.photoId])
      }
    case RECEIVE_PHOTOS:
      const data = _.map(action.photos, formatData)
      const normalizedData = normalize(data, entitySchema).entities
      return {
        users: users(state.users, normalizedData.users),
        photos: photos(state.photos, normalizedData.photos)
      }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  selectedPhoto,
  isFetching,
  entities
})

export function getSelectedPhoto(state) {
  return state.entities.photos[state.selectedPhoto]
}

/*
// returns 3 photos uploaded or liked by the same user
// as the one who took the current selectedPhoto
*/
export function getRelatedPhotos(state) {
  if (state.isFetching.photos || state.isFetching.likes) {
    return []
  }

  const user = state.entities.users[state.entities.photos[state.selectedPhoto].user]
  const userPhotos = getUsablePhotos(state.entities.photos, user.photos)
  const userLikes = getUsablePhotos(state.entities.photos, user.likedPhotos)

  // try to enforce 2/3 likes when possible
  // to prevent single-user loops
  const relatedPhotos = _.concat(userLikes.slice(0, 2), userPhotos, userLikes.slice(2))

  return relatedPhotos.slice(0, 3)
}

/*
// for a list of photo IDs, returns the photo objects
// that can be used as new graph nodes
*/
export function getUsablePhotos(state, photoIds) {
  const photos = _.map(photoIds, id => state[id])
  return _.uniq(_.reject(photos, {displayed: true}))
}
