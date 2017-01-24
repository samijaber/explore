import {unsplash, toJson} from '../utils/unsplash';

export const REQUEST_PHOTO = 'REQUEST_PHOTO';
function requestPhoto(keyword) {
  return {
    type: REQUEST_PHOTO,
    keyword
  };
}

export const RECEIVE_PHOTO = 'RECEIVE_PHOTO';
function receivePhoto(photo) {
  return {
    type: RECEIVE_PHOTO,
    photo
  };
}

export const SELECT_PHOTO = 'SELECT_PHOTO';
function selectPhoto(photo) {
  return {
    type: SELECT_PHOTO,
    photoId: photo.id
  };
}

export function fetchPhoto(keyword) {
  return function (dispatch) {
    dispatch(requestPhoto(keyword));
    return unsplash.photos.getRandomPhoto({ query: keyword, featured: true })
      .then(toJson)
      .then( data => {
        dispatch(receivePhoto(data))
        dispatch(selectPhoto(data))
      });
  };
}
