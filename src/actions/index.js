import _ from 'lodash'

import { unsplash, toJson } from '../utils/unsplash'

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
function requestPhotos() {
  return {
    type: REQUEST_PHOTOS
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

function fetchUserPhotos(username) {
  return function (dispatch) {
    return unsplash.users.photos(username, 1, 30, 'popular')
      .then(toJson)
      .then( photos => {
        dispatch(receivePhotos(photos, "user photos"))
      })
  }
}

function fetchUserLikes(username) {
  return function (dispatch) {
    return unsplash.users.likes(username, 1, 30, 'popular')
      .then(toJson)
      .then( photos => {
        const PhotosWithLikerId = _.map(photos, photo => {
          return { ...photo, likedBy: { username } }
        })
        dispatch(receivePhotos(PhotosWithLikerId, "user likes"))
      })
  }
}

function fetchNextBatch(username) {
  return function (dispatch) {
    dispatch(fetchUserPhotos(username))
    dispatch(fetchUserLikes(username))
  }
}

export function selectPhotoAndFetchRelated(photo) {
  return function (dispatch) {
    dispatch(selectPhoto(photo.id))
    dispatch(fetchNextBatch(photo.user))
  }
}

export function initialSearch() {
  return function (dispatch) {
    return unsplash.photos.listPhotos(1, 50, 'popular')
      .then(toJson)
      .then( photos => {
        // pick a photo whose user won't be a dead-end
        const photo = _.sample(_.reject(photos,
          photo =>
            (photo.user.total_likes + photo.user.total_photos > 10) &&
            photo.user.total_likes > 0
        ))
        dispatch(receivePhotos(photos, "initial photo"))
        dispatch(selectPhotoAndFetchRelated({id: photo.id, user: photo.user.username}))
      })
  }
}
