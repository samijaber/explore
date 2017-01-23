import { combineReducers } from 'redux';

import {
  RECEIVE_COLLECTION, REQUEST_COLLECTION,
  SELECT_COLLECTION, RECEIVE_RELATED_COLLECTIONS
} from '../actions/collection';
import { RECEIVE_PHOTOS } from '../actions/photos';

function selectedCollection(state: any = {}, action: any) {
  switch (action.type) {
    case SELECT_COLLECTION:
      return action.collection.id;
    default:
      return state;
  }
}

function collection(
  state: any = {
    isFetching: false,
    metadata: {},
    photos: [],
    collectionIds: []
  },
  action: any) {
  switch (action.type) {
    case REQUEST_COLLECTION:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_COLLECTION:
      return {
        ...state,
        isFetching: false,
        metadata: action.collection
      };
    case RECEIVE_RELATED_COLLECTIONS:
      return {
        ...state,
        collectionIds: action.collectionIds
      };
    case RECEIVE_PHOTOS:
      return {
        ...state,
        photos: action.photos
      };
    default:
      return state;
  }
}

function collections(state: any = {}, action: any) {
  switch (action.type) {
    case REQUEST_COLLECTION:
    case RECEIVE_COLLECTION:
    case RECEIVE_RELATED_COLLECTIONS:
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
