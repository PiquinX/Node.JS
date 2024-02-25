import z from 'zod'

const serieSchema = z.object({
  title: z.string(),
  poster: z.string().url()
})

// * To create a serie
export const validateSerie = (object) => {
  return serieSchema.safeParse(object)
}

// ? To modify the serie
export const validatePartialSerie = (object) => {
  return serieSchema.partial().safeParse(object)
}
