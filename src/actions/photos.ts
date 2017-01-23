import * as Redux from 'redux';
import * as _ from 'lodash';

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
function receivePhotos(collectionId: string, photos: any) {
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
      .then((data: any) => {
        const photos = _.map(_.take(data, 3), photoData =>
          _.pick(photoData, ['id', 'urls', 'categories'])
        );
        dispatch(receivePhotos(collectionId, photos));
      });
  };
}

function shouldFetchPhotos(state: any, collectionId: string) {
  const collection = state.collections[collectionId];
  if (collection == null || collection.photos == null) {
    return true;
  } else {
    return false;
  }
}

export function fetchPhotosIfNeeded(collectionId: string) {
  return (dispatch: any, getState: any) => {
    if (shouldFetchPhotos(getState(), collectionId)) {
      return dispatch(fetchPhotos(collectionId));
    }
  };
}

