'use server'

import { revalidatePath } from 'next/cache'
import { IDType, SerieFormType, SerieResponseType, SerieType, SeriesListType, State } from '../definitions'
import { redirect } from 'next/navigation'
import { CreateSerieFormSchema } from '../schemas'

export const getSeries = async (): Promise<SeriesListType | false> => {
  try {
    const response = await fetch('http://localhost:777/series')

    const series = await response.json()

    return series.map((serie: SerieResponseType) => ({
      id: serie.id,
      title: serie.title,
      poster: serie.poster
    }))
  } catch (err) {
    return false
  }
}

export const getSerieByID = async ({ id }: { id: string }): Promise<SerieType | false> => {
  try {
    const response = await fetch(`http://localhost:777/series/${id}`)

    const serie = await response.json()

    if (!serie.id) return false

    return {
      id: serie.id,
      title: serie.title,
      poster: serie.poster
    }
  } catch (err) {
    return false
  }
}

export const createSerie = async ({ title, poster }: SerieFormType): Promise<false | string> => {
  try {
    const response = await fetch('http://localhost:777/series', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ title, poster })
    })
    const newSerie = await response.json()

    if (newSerie.errorMessage) return newSerie.errorMessage
    else {
      revalidatePath('/series')
      return false
    }
  } catch (err) {
    return 'Unexpected Error, try again'
  }
}

export const updateSerie = async (id: IDType, prevState: State, formData : FormData) => {
  const validatedFields = CreateSerieFormSchema.safeParse({
    title: formData.get('serie-title'),
    poster: formData.get('serie-poster')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Edit Serie.'
    }
  }

  const { title, poster } = validatedFields.data

  try {
    const response = await fetch(`http://localhost:777/series/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ title, poster })
    })
    const updatedSerie = await response.json()

    console.log(updatedSerie)

    if (updatedSerie.errorMessage) {
      return {
        errors: {
          external: [updatedSerie.errorMessage]
        },
        message: updatedSerie.errorMessage
      }
    }
  } catch (err) {
    return {
      errors: {
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath(`/series/edit-serie/${id}`)
  revalidatePath('/series')
  redirect('/series')
}
