import * as Redux from 'redux';
import * as fetch from 'isomorphic-fetch';
import * as _ from 'lodash';

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
function receiveCollection(collectionId: string, data: any) {
  const collection: any = _.pick(data, ['id', 'title', 'description']);
  const related: boolean = collection.id === collectionId ? false : true;

  return {
    type: RECEIVE_COLLECTION,
    collection,
    related // useless?
  };
}

export const RECEIVE_RELATED_COLLECTIONS = 'RECEIVE_RELATED_COLLECTIONS';
function receiveRelatedCollections(collectionId: string, data: any) {
  const collectionIds: Array<number> = _.map(data, (collectionData: any) => collectionData.id);

  return {
    type: RECEIVE_RELATED_COLLECTIONS,
    collection: {
      id: collectionId
    },
    collectionIds
  };
}

// thunk action creator
function fetchCollection(collectionId: string) {
  return function (dispatch: Redux.Dispatch<any>) {
    dispatch(requestCollection(collectionId));

    return unsplash.collections.getCollection(collectionId)
      .then(toJson)
      .then((data: any) => {
        dispatch(receiveCollection(collectionId, data));
      });
  };
}

function shouldFetchCollection(state: any, collectionId: string) {
  const collection = state.collections[collectionId];
  if (collection == null || collection.metadata == null) {
    return true;
  } else {
    return false;
  }
}

export function fetchCollectionIfNeeded(collectionId: string) {
  return (dispatch: any, getState: any) => {
    if (shouldFetchCollection(getState(), collectionId)) {
      return dispatch(fetchCollection(collectionId));
    }
  };
}

function fetchRelatedCollections(collectionId: string) {
  // TODO: replace with unsplash-js
  const url = `https://api.unsplash.com/collections/${collectionId}/related`;
  const queryParam = '?client_id=' + process.env.REACT_APP_UNSPLASH_APP_ID;

  return function (dispatch: Redux.Dispatch<any>) {
    return fetch(url + queryParam)
      .then(toJson)
      .then((data: any) => {
        dispatch(receiveRelatedCollections(collectionId, data));
        data.forEach((collectionData: any) =>
          dispatch(receiveCollection(collectionId, collectionData))
        );
      });
  };
}

function shouldFetchRelatedCollections(state: any, collectionId: string) {
  const collection = state.collections[collectionId];
  if (collection == null || collection.collectionIds == null) {
    return true;
  } else {
    return false;
  }
}

export function fetchRelatedCollectionsIfNeeded(collectionId: string) {
  return (dispatch: any, getState: any) => {
    if (shouldFetchRelatedCollections(getState(), collectionId)) {
      return dispatch(fetchRelatedCollections(collectionId));
    }
  };
}
