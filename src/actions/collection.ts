import * as Redux from 'redux';
import {unsplash, toJson} from './unsplash-api';

export const SELECT_COLLECTION = 'SELECT_COLLECTION';
export function selectCollection(collectionId: string) {
  return {
    type: SELECT_COLLECTION,
    collection: {
      id: collectionId
    }
  };
}

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION';
function requestCollection(collectionId: string) {
  return {
    type: REQUEST_COLLECTION,
    collection: {
      id: collectionId
    }
  };
}

export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
function receiveCollection(collectionId: string, collectionData: any) {
  return {
    type: RECEIVE_COLLECTION,
    collection: collectionData
  };
}

// thunk action creator
export function fetchCollection(collectionId: string) {
  return function (dispatch: Redux.Dispatch<any>) {
    dispatch(requestCollection(collectionId));

    return unsplash.collections.getCuratedCollection(collectionId)
      .then(toJson)
      .then((collectionData: any) =>
        dispatch(receiveCollection(collectionId, collectionData))
      );
  };
}
