import * as Redux from 'redux';

import {unsplash, toJson} from './unsplash-api';

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
function requestPhotos(collectionId: string) {
  return {
    type: REQUEST_PHOTOS,
    collection: {
      id: collectionId
    }
  };
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
function receivePhotos(collectionId: string, photos) {
  return {
    type: RECEIVE_PHOTOS,
    collection: {
      id: collectionId
    },
    photos: photos
  };
}

function fetchPhotos(collectionId: string) {
  return function (dispatch: Redux.Dispatch<any>) {
    dispatch(requestPhotos(collectionId));
    return unsplash.collections.getCollectionPhotos(collectionId, 1, 10, 'popular')
      .then(toJson)
      .then(data => {
        dispatch(receivePhotos(collectionId, data));
      });
  };
}

function shouldFetchPhotos(state, collectionId: string) {
  const collection = state.collections[collectionId];
  if (
    collection.isFetchingPhotos === true ||
    collection.photos.length > 0
  ) {
    return false;
  } else {
    return true;
  }
}

export function fetchPhotosIfNeeded(collectionId: string) {
  return (dispatch, getState) => {
    if (shouldFetchPhotos(getState(), collectionId)) {
      return dispatch(fetchPhotos(collectionId));
    }
  };
}
