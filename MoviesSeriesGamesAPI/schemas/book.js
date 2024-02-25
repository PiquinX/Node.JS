import z from 'zod'

const bookSchema = z.object({
  title: z.string(),
  poster: z.string().url()
})

// * To create a book
export const validateBook = (object) => {
  return bookSchema.safeParse(object)
}

// ? To modify the book
export const validatePartialBook = (object) => {
  return bookSchema.partial().safeParse(object)
}
