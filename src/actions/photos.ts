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
function receivePhotos(collectionId: string, photos: any) {
  return {
    type: RECEIVE_PHOTOS,
    collection: {
      id: collectionId
    },
    photos: photos
  };
}

export function fetchPhotos(collectionId: string) {
  return function (dispatch: Redux.Dispatch<any>) {
    dispatch(requestPhotos(collectionId));
    return unsplash.collections.getCuratedCollectionPhotos(collectionId, 1, 3, 'popular')
      .then(toJson)
      .then((photos: any) => {
        dispatch(receivePhotos(collectionId, photos));
      });
  };
}
