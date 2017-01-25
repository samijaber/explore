import { schema } from 'normalizr'
import _ from 'lodash'

// adds array of photo IDs to entity
const addPhotoId = (value, parentPhoto, key) => {
  return {
    ...value,
    photos: [ parentPhoto.id ]
  }
}

const userSchema = new schema.Entity('users', {}, {
  processStrategy: addPhotoId
})

const categorySchema = new schema.Entity('categories', {}, {
  processStrategy: addPhotoId
})

// this schema represents an array of photos
// which is what all API calls we make will return
export const entitySchema = [ new schema.Entity('photos', {
  user: userSchema,
  categories: [ categorySchema ]
}) ]

const props = {
  photo: ['id', 'urls', 'likes'],
  category: ['id', 'title', 'photo_count'],
  user: ['id', 'username', 'name', 'bio', 'total_photos']
}

const formatObject = (data, entityName) => {
  return _.pick(data, props[entityName])
}
const formatPhoto = (photo) => formatObject(photo, 'photo')
const formatCategory = (category) => formatObject(category, 'category')
const formatUser = (user) => formatObject(user, 'user')

export const formatData = (photo) => {
  return {
    ...formatPhoto(photo),
    categories: _.map(photo.categories, formatCategory),
    user: formatUser(photo.user)
  }
}
