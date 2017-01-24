import * as Redux from 'redux';
import * as fetch from 'isomorphic-fetch';
import * as _ from 'lodash';

import {unsplash, toJson} from './unsplash-api';
import {fetchPhotosIfNeeded} from './photos';

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
function receiveCollection(collectionId: string, data) {
  const collection: any = _.pick(data, ['id', 'title', 'description']);
  const related: boolean = collection.id === collectionId ? false : true;

  return {
    type: RECEIVE_COLLECTION,
    collection,
    related // useless?
  };
}

export const RECEIVE_RELATED_COLLECTIONS = 'RECEIVE_RELATED_COLLECTIONS';
function receiveRelatedCollections(collectionId: string, data) {
  const collectionIds = _.map(data, (collectionData: any) => collectionData.id);

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
      .then(data => {
        dispatch(receiveCollection(collectionId, data));
      });
  };
}

function shouldFetchCollection(state, collectionId: string) {
  const collection = state.collections[collectionId];
  if (collection == null) {
    return true;
  } else {
    return false;
  }
}

function fetchCollectionIfNeeded(collectionId: string) {
  return (dispatch, getState) => {
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
        // dispatch individual collection recieval first
        data.forEach((collectionData) =>
          dispatch(receiveCollection(collectionId, collectionData))
        );
        // dispatch recieval of related IDs now
        dispatch(receiveRelatedCollections(collectionId, data));
      });
  };
}

function shouldFetchRelatedCollections(state, collectionId: string) {
  const collection = state.collections[collectionId];
  if (collection.collectionIds.length === 0) {
    return true;
  } else {
    return false;
  }
}

function fetchRelatedCollectionsIfNeeded(collectionId: string) {
  return (dispatch, getState) => {
    if (shouldFetchRelatedCollections(getState(), collectionId)) {
      return dispatch(fetchRelatedCollections(collectionId));
    }
  };
}

export function selectAndFetchCollection(collectionId: string) {
  return (dispatch) => {
    dispatch(selectCollection(collectionId));
    dispatch(fetchCollectionIfNeeded(collectionId));
    dispatch(fetchPhotosIfNeeded(collectionId));
    dispatch(fetchRelatedCollectionsIfNeeded(collectionId));
  };
}
