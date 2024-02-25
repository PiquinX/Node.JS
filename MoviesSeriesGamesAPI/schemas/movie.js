import z from 'zod'

const movieSchema = z.object({
  title: z.string(),
  poster: z.string().url()
})

// * To create a movie
export const validateMovie = (object) => {
  return movieSchema.safeParse(object)
}

// ? To modify the movie
export const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object)
}
