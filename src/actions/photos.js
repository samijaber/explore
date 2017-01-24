import {unsplash, toJson} from '../utils/unsplash';

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
function requestPhotos(collectionId) {
  return {
    type: REQUEST_PHOTOS,
    collection: {
      id: collectionId
    }
  };
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
function receivePhotos(collectionId, photos) {
  return {
    type: RECEIVE_PHOTOS,
    collection: {
      id: collectionId
    },
    photos: photos
  };
}

function fetchPhotos(collectionId) {
  return function (dispatch) {
    dispatch(requestPhotos(collectionId));
    return unsplash.collections.getCollectionPhotos(collectionId, 1, 10, 'popular')
      .then(toJson)
      .then(data => {
        dispatch(receivePhotos(collectionId, data));
      });
  };
}

function shouldFetchPhotos(state, collectionId) {
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

export function fetchPhotosIfNeeded(collectionId) {
  return (dispatch, getState) => {
    if (shouldFetchPhotos(getState(), collectionId)) {
      return dispatch(fetchPhotos(collectionId));
    }
  };
}
