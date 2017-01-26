import { combineReducers } from 'redux'
import { normalize } from 'normalizr'
import _ from 'lodash'

import {
  RECEIVE_PHOTOS, SELECT_PHOTO
} from '../actions'
import { entitySchema, formatData, userMergeStrategy } from '../store/schema'

function selectedPhoto(state = null, action) {
  switch (action.type) {
    case SELECT_PHOTO:
      return action.photoId
    default:
      return state
  }
}

function isFetching(state = {}, action) {
  switch (action.type) {
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

function markPhotoAsSelected(state, photoId) {
  return {
    ...state,
    [photoId]: {
      ...state[photoId],
      selected: true
    }
  }
}

function entities(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PHOTOS:
      const data = _.map(action.photos, formatData)
      const normalizedData = normalize(data, entitySchema).entities
      return {
        users: users(state.users, normalizedData.users),
        photos: photos(state.photos, normalizedData.photos)
      }
    case SELECT_PHOTO:
      return {
        ...state,
        photos: markPhotoAsSelected(state.photos, action.photoId)
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

export function getRelatedPhotos(state) {
  if (state.isFetching.photos || state.isFetching.likes) {
    return []
  }

  const user = state.entities.users[state.entities.photos[state.selectedPhoto].user]
  const userPhotos = _.map(user.photos, (photoId) => state.entities.photos[photoId])
  const userLikes = _.map(user.likes, (photoId) => state.entities.photos[photoId])

  const potentialPhotos = _.uniq(_.concat(userPhotos, userLikes))
  const relatedPhotos = _.reject(potentialPhotos, {selected: true})

  return _.sampleSize(relatedPhotos, 3)
}
