import { schema } from 'normalizr'

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

export const entitySchema = new schema.Entity('photos', {
  user: userSchema,
  categories: [ categorySchema ]
})
