import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import {unsplash, toJson} from '../utils/unsplash';
import {fetchPhotosIfNeeded} from './photos';

export const SELECT_COLLECTION = 'SELECT_COLLECTION';
export function selectCollection(collectionId) {
  return {
    type: SELECT_COLLECTION,
    collection: {
      id: collectionId
    }
  };
}

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION';
function requestCollection(collectionId) {
  return {
    type: REQUEST_COLLECTION,
    collection: {
      id: collectionId
    }
  };
}

export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
function receiveCollection(collectionId, data) {
  const collection = _.pick(data, ['id', 'title', 'description']);
  const related: boolean = collection.id === collectionId ? false : true;

  return {
    type: RECEIVE_COLLECTION,
    collection,
    related // useless?
  };
}

export const RECEIVE_RELATED_COLLECTIONS = 'RECEIVE_RELATED_COLLECTIONS';
function receiveRelatedCollections(collectionId, data) {
  const collectionIds = _.map(data, (collectionData) => collectionData.id);

  return {
    type: RECEIVE_RELATED_COLLECTIONS,
    collection: {
      id: collectionId
    },
    collectionIds
  };
}

// thunk action creator
function fetchCollection(collectionId) {
  return function (dispatch) {
    dispatch(requestCollection(collectionId));

    return unsplash.collections.getCollection(collectionId)
      .then(toJson)
      .then(data => {
        dispatch(receiveCollection(collectionId, data));
      });
  };
}

function shouldFetchCollection(state, collectionId) {
  const collection = state.collections[collectionId];
  if (collection == null) {
    return true;
  } else {
    return false;
  }
}

function fetchCollectionIfNeeded(collectionId) {
  return (dispatch, getState) => {
    if (shouldFetchCollection(getState(), collectionId)) {
      return dispatch(fetchCollection(collectionId));
    }
  };
}

function fetchRelatedCollections(collectionId) {
  // TODO: replace with unsplash-js
  const url = `https://api.unsplash.com/collections/${collectionId}/related`;
  const queryParam = '?client_id=' + process.env.REACT_APP_UNSPLASH_APP_ID;

  return function (dispatch) {
    return fetch(url + queryParam)
      .then(toJson)
      .then((data) => {
        // dispatch individual collection recieval first
        data.forEach((collectionData) =>
          dispatch(receiveCollection(collectionId, collectionData))
        );
        // dispatch recieval of related IDs now
        dispatch(receiveRelatedCollections(collectionId, data));
      });
  };
}

function shouldFetchRelatedCollections(state, collectionId) {
  const collection = state.collections[collectionId];
  if (collection.collectionIds.length === 0) {
    return true;
  } else {
    return false;
  }
}

function fetchRelatedCollectionsIfNeeded(collectionId) {
  return (dispatch, getState) => {
    if (shouldFetchRelatedCollections(getState(), collectionId)) {
      return dispatch(fetchRelatedCollections(collectionId));
    }
  };
}

export function selectAndFetchCollection(collectionId) {
  return (dispatch) => {
    dispatch(selectCollection(collectionId));
    dispatch(fetchCollectionIfNeeded(collectionId));
    dispatch(fetchPhotosIfNeeded(collectionId));
    dispatch(fetchRelatedCollectionsIfNeeded(collectionId));
  };
}
