import {faker} from '@faker-js/faker'

import type {Patient, User} from '../types'

export const currentUser = {
  id: 'gy9po',
  name: 'Dr. Foster',
} as User

export const patient = {
  id: 'h80pd',
  name: 'Patience Hooper',
} as Patient

const noteFactory = () => ({
  id: faker.datatype.string(5),
  author: {
    id: faker.datatype.string(5),
    name: faker.name.fullName(),
  },
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
  system: faker.datatype.boolean(),
  history: [
    {
      author: {
        id: faker.datatype.string(5),
        name: faker.name.fullName(),
      },
      time: faker.date.past().toISOString(),
    },
  ],
})

export const notes = [
  ...Array.from({length: 2}, noteFactory),
  {...noteFactory(), author: currentUser, system: false},
  ...Array.from({length: 5}, noteFactory),
  {...noteFactory(), author: currentUser, system: true},
  ...Array.from({length: 3}, noteFactory),
]
