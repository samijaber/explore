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

export function selectPhotoAndFetchRelated(photoId, username) {
  return function (dispatch) {
    dispatch(selectPhoto(photoId))
    dispatch(fetchNextBatch(username))
  }
}

export function initialSearch() {
  return function (dispatch) {
    return unsplash.photos.getRandomPhoto({ featured: true })
      .then(toJson)
      .then( photo => {
        dispatch(receivePhotos([photo], "random photo"))
        dispatch(selectPhotoAndFetchRelated(photo.id, photo.user.username))
      })
  }
}
