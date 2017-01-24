import { combineReducers } from 'redux'
import { normalize } from 'normalizr'
import _ from 'lodash'

import {
  REQUEST_PHOTO, RECEIVE_PHOTO,
  SELECT_PHOTO
} from '../actions'
import { entitySchema } from '../store/schema'

function selectedPhoto(state = null, action) {
  switch (action.type) {
    case SELECT_PHOTO:
      return action.photoId
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
    case RECEIVE_PHOTO:
      let normalizedData = normalize(action.photo, entitySchema).entities
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
  entities
})
