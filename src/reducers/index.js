import { combineReducers } from 'redux'
import { normalize } from 'normalizr'
import _ from 'lodash'

import {
  REQUEST_PHOTOS, RECEIVE_PHOTOS, SELECT_PHOTO
} from '../actions'
import { entitySchema, formatData } from '../store/schema'

/*
// describes how the next search will be done
// can either be 'user' to search photos by same author
// or 'category' to search photos by same category
*/
function nextStep(state = 'user', action) {
  switch (action.type) {
    case RECEIVE_PHOTOS:
      return action.nextStep || state
    default:
      return state
  }
}

function selectedPhoto(state = null, action) {
  switch (action.type) {
    case SELECT_PHOTO:
      return action.photoId
    default:
      return state
  }
}

function relatedPhotos(state = [], action) {
  switch (action.type) {
    case SELECT_PHOTO:
      return []
    case RECEIVE_PHOTOS:
      if (action.related === true) {
        return _.map(action.photos, photo => photo.id)
      } else {
        return state
      }
    default:
      return state
  }
}

function usersOrCategories(state = {}, action) {
  /*
  // This function will merge two instances of an entity,
  // while correctly concatenating its photos IDs array
  */
  function mergeStrategy(entityA = {}, entityB = {}) {
    return {
      ...entityA,
      ...entityB,
      photos: [ ...(entityA.photos || []), ...(entityB.photos || [])]
    }
  }

  return _.mergeWith({}, state, action, mergeStrategy)
}

function photos(state = {}, action) {
  return { ...state, ...action }
}

function entities(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PHOTOS:
      const data = _.map(action.photos, formatData)
      const normalizedData = normalize(data, entitySchema).entities
      return {
        categories: usersOrCategories(state.categories, normalizedData.categories),
        users: usersOrCategories(state.users, normalizedData.users),
        photos: photos(state.photos, normalizedData.photos)
      }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  selectedPhoto,
  nextStep,
  relatedPhotos,
  entities
})
