import z from 'zod'

export const CreateBookFormSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a text'
  }),
  poster: z.string({
    required_error: 'Image URL is required'
  }).url({
    message: 'Must provide the URL of an image'
  })
})

export const CreateMovieFormSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a text'
  }),
  poster: z.string({
    required_error: 'Image URL is required'
  }).url({
    message: 'Must provide the URL of an image'
  })
})

export const CreateSerieFormSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a text'
  }),
  poster: z.string({
    required_error: 'Image URL is required'
  }).url({
    message: 'Must provide the URL of an image'
  })
})
