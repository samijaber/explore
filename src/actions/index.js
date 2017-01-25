import _ from 'lodash'

import { unsplash, toJson } from '../utils/unsplash'

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
function requestPhotos(query) {
  return {
    type: REQUEST_PHOTOS,
    ...query
  }
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'
function receivePhotos({photos, nextStep, related = false}) {
  return {
    type: RECEIVE_PHOTOS,
    nextStep,
    related,
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

function shouldFetchRelatedPhotos(state, photoId) {
  // TODO: check if related photos have been fetched already
  return true
}

function fetchRelatedPhotos(state, photoId) {
  return function (dispatch) {
    let apiCall, nextStep
    const selectedPhoto = state.entities.photos[state.selectedPhoto]
    const user = state.entities.users[selectedPhoto.user]
    if (
      (state.nextStep === 'user' && user.total_photos > 10) ||
      selectedPhoto.categories.length === 0
    ) {
      nextStep = 'category'
      apiCall = unsplash.users.photos(user.username, 1, 10, 'popular')
      dispatch(requestPhotos({username: user.username}))
    } else {
      nextStep = 'user'
      // TODO: try getting 1 from each category if multiple
      const category = selectedPhoto.categories[0]
      apiCall = unsplash.categories.categoryPhotos(category, 1, 10)
      dispatch(requestPhotos({category: category}))
    }

    return apiCall
      .then(toJson)
      .then( data => {
        // exclude selected photo if in array
        const photos = _.reject(data, {id: photoId})
        dispatch(receivePhotos({photos, nextStep, related: true}))
      })
  }
}

function fetchRelatedPhotosIfNeeded(photoId) {
  return (dispatch, getState) => {
    const state = getState()
    if (shouldFetchRelatedPhotos(state, photoId)) {
      return dispatch(fetchRelatedPhotos(state, photoId))
    }
  }
}

export function selectPhotoAndFetchRelated(photoId) {
  return function (dispatch) {
    // clear relatedPhotoIds for new select?
    dispatch(selectPhoto(photoId))
    dispatch(fetchRelatedPhotosIfNeeded(photoId))
  }
}

export function fetchInitialPhoto(keyword) {
  return function (dispatch) {
    dispatch(requestPhotos(keyword))
    return unsplash.photos.getRandomPhoto({ query: keyword, featured: true })
      .then(toJson)
      .then( photo => {
        dispatch(receivePhotos({photos: [photo]}))
        dispatch(selectPhotoAndFetchRelated(photo.id))
      })
  }
}
