import { combineReducers } from 'redux';

import {
  RECEIVE_COLLECTION, REQUEST_COLLECTION,
  SELECT_COLLECTION, RECEIVE_RELATED_COLLECTIONS
} from '../actions/collection';
import {
  REQUEST_PHOTOS, RECEIVE_PHOTOS
} from '../actions/photos';

function selectedCollection(state = {}, action) {
  switch (action.type) {
    case SELECT_COLLECTION:
      return action.collection.id;
    default:
      return state;
  }
}

function collection(
  state = {
    isFetchingMetadata: false,
    isFetchingPhotos: false,
    metadata: {},
    photos: [],
    collectionIds: []
  },
  action) {
  switch (action.type) {
    case REQUEST_COLLECTION:
      return {
        ...state,
        isFetchingMetadata: true
      };
    case RECEIVE_COLLECTION:
      return {
        ...state,
        isFetchingMetadata: false,
        metadata: action.collection
      };
    case RECEIVE_RELATED_COLLECTIONS:
      return {
        ...state,
        collectionIds: action.collectionIds
      };
    case REQUEST_PHOTOS:
      return {
        ...state,
        isFetchingPhotos: true
      };
    case RECEIVE_PHOTOS:
      return {
        ...state,
        isFetchingPhotos: false,
        photos: action.photos
      };
    default:
      return state;
  }
}

function collections(state = {}, action) {
  switch (action.type) {
    case REQUEST_COLLECTION:
    case RECEIVE_COLLECTION:
    case RECEIVE_RELATED_COLLECTIONS:
    case REQUEST_PHOTOS:
    case RECEIVE_PHOTOS:
      return Object.assign({}, state, {
        [action.collection.id]: collection(state[action.collection.id], action)
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  collections,
  selectedCollection
});
