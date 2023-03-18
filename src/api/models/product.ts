import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'

export const CategoryEnum = {
  electronics: 'electronics',
  furniture: 'furniture',
  clothing: 'clothing',
  books: 'books',
  sports: 'sports',
  tools: 'tools',
  toys: 'toys',
  games: 'games',
  movies: 'movies',
  music: 'music',
  pets: 'pets',
  other: 'other'
}

export const yupProductSchema = yup.object({
  id: yup.string().default(uuidv4()),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required').max(1000),
  price: yup.number().required('Price is required'),
  category: yup.object({
    id: yup.string().default(uuidv4()),
    name: yup
      .string()
      .required('Category name is required')
      .oneOf(Object.values(CategoryEnum)),
    image: yup.array().of(yup.string()).optional()
  }),
  image: yup.array().of(yup.string()).optional()
})

export type ProductSchema = yup.InferType<typeof yupProductSchema>
