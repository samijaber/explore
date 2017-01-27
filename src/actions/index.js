import _ from 'lodash'

import { unsplash, toJson } from '../utils/unsplash'
import { getUsablePhotos } from '../reducers'

const REQUEST_ALTERNATE_PHOTOS = 'REQUEST_ALTERNATE_PHOTOS'
function requestAlternatePhotos(username) {
  return {
    type: REQUEST_ALTERNATE_PHOTOS,
    username: username
  }
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'
function receivePhotos(photos, origin) {
  return {
    type: RECEIVE_PHOTOS,
    from: origin,
    photos
  }
}

export const SELECT_PHOTO = 'SELECT_PHOTO'
function selectPhoto(photoId) {
  return {
    type: SELECT_PHOTO,
    photoId: photoId
  }
}

export const DISPLAY_PHOTOS = 'DISPLAY_PHOTOS'
export function displayPhotos(photoIds) {
  return {
    type: DISPLAY_PHOTOS,
    photoIds
  }
}

export const CANCEL_REQUEST = 'CANCEL_REQUEST'
function cancelRequest() {
  return {
    type: CANCEL_REQUEST
  }
}

export const RESET_STATE = 'RESET_STATE'
export function resetState() {
  return {
    type: RESET_STATE
  }
}

function fetchUserPhotos(username) {
  return function (dispatch) {
    return unsplash.users.photos(username, 1, 30, 'popular')
      .then(toJson)
      .then( photos => {
        dispatch(receivePhotos(photos, "user photos"))
      })
  }
}

function fetchLikesAlternatives(username) {
  return function (dispatch) {
    dispatch(requestAlternatePhotos(username))
    return unsplash.photos.listPhotos(getRndPage(), 50, 'popular')
      .then(toJson)
      .then( photos => {
        // pretend like inactive user likes all those photos
        const photosExclSelfLikes = _.reject(photos, { user: {username: username}})
        const photosWithLikerId = _.map(photosExclSelfLikes, photo => {
          return { ...photo, likedBy: { username } }
        })
        dispatch(receivePhotos(photosWithLikerId, "user likes"))
      })
  }
}

function fetchUserLikes(username) {
  return function (dispatch) {
    return unsplash.users.likes(username, 1, 30, 'popular')
      .then(toJson)
      .then( photos => {
        // exclude user's own photos
        // some people really like their work
        const photosExclSelfLikes = _.reject(photos, { user: {username: username}})

        if (photosExclSelfLikes.length >= 2) {
          const photosWithLikerId = _.map(photos, photo => {
            return { ...photo, likedBy: { username } }
          })
          dispatch(receivePhotos(photosWithLikerId, "user likes"))
        } else {
          // hack: if user liked no pics
          // get random pics and attribute to them
          dispatch(fetchLikesAlternatives(username))
        }
      })
  }
}

function fetchNextBatch(username) {
  return function (dispatch) {
    dispatch(fetchUserPhotos(username))
    dispatch(fetchUserLikes(username))
  }
}

function needsMorePhotos(state, username) {
  const user = state.entities.users[username]
  const allPhotoIds = _.concat(user.photos, user.likedPhotos)
  if (getUsablePhotos(state.entities.photos, allPhotoIds).length < 3) {
    return true
  } else {
    return false
  }
}

function fetchNextBatchIfNeeded(username) {
  return (dispatch, getState) => {
    if (needsMorePhotos(getState(), username)) {
      dispatch(fetchNextBatch(username))
    } else {
      dispatch(cancelRequest())
    }
  }
}

export function selectPhotoAndFetchRelated(photo) {
  return function (dispatch) {
    dispatch(selectPhoto(photo.id))
    dispatch(fetchNextBatchIfNeeded(photo.user))
  }
}

export function initialSearch() {
  return function (dispatch) {
    return unsplash.photos.listPhotos(getRndPage(), 50, 'popular')
      .then(toJson)
      .then( photos => {
        const photo = _.sample(activeUser(photos))
        dispatch(receivePhotos(photos, "initial photo"))
        dispatch(selectPhotoAndFetchRelated({id: photo.id, user: photo.user.username}))
      })
  }
}

// helper to make sure photo uploader is not inactive
function activeUser(photos) {
  return _.filter( photos,
    photo =>
      (photo.user.total_likes + photo.user.total_photos > 10) &&
      photo.user.total_likes > 0
  )
}

function getRndPage() {
  return Math.floor(Math.random() * 10) + 1
}
