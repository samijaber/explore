import { schema } from 'normalizr'
import _ from 'lodash'

// adds array of photo refs to user
const userProcessStrategy = (value, parentPhoto, key) => {
  switch (key) {
    case 'user':
      return { ...value, photos: [ parentPhoto.id ]}
    case 'likedBy':
      return { ...value, likedPhotos: [ parentPhoto.id ]}
    default:
      return value
  }
}

/*
// This function will merge two user instances,
// while correctly concatenating its photos and likes arrays
*/
export const userMergeStrategy = (entityA = {}, entityB = {}) => {
  return {
    ...entityA,
    ...entityB,
    photos: [ ...(entityA.photos || []), ...(entityB.photos || [])],
    likedPhotos: [ ...(entityA.likedPhotos || []), ...(entityB.likedPhotos || [])]
  }
}

const userSchema = new schema.Entity('users', {}, {
  processStrategy: userProcessStrategy,
  mergeStrategy: userMergeStrategy,
  idAttribute: 'username'
})

/*
// this schema represents an array of photos
// which is what all API calls we make will return
*/
export const entitySchema = [ new schema.Entity('photos', {
  user: userSchema,
  likedBy: userSchema
}) ]


// helper functions to clean up API data
const props = {
  photo: ['id', 'urls', 'likes', 'likedBy'],
  user: ['id', 'username', 'name', 'bio', 'total_photos', 'total_likes']
}
const formatPhoto = (photo) => _.pick(photo, props['photo'])
const formatUser = (user) => _.pick(user, props['user'])

export const formatData = (photo) => {
  return {
    ...formatPhoto(photo),
    user: formatUser(photo.user)
  }
}
