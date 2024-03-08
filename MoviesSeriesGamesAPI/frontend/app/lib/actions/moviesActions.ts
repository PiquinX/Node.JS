'use server'

import { revalidatePath } from 'next/cache'
import { IDType, MovieFormType, MovieResponseType, MovieType, MoviesListType, State } from '../definitions'
import { CreateMovieFormSchema } from '../schemas'
import { redirect } from 'next/navigation'

export const getMovies = async (): Promise<MoviesListType | false> => {
  try {
    const response = await fetch('http://localhost:777/movies')

    const movies = await response.json()

    return movies.map((movie: MovieResponseType) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster
    }))
  } catch (err) {
    return false
  }
}

export const getMovieByID = async ({ id }: { id: string }): Promise<MovieType | false> => {
  try {
    const response = await fetch(`http://localhost:777/movies/${id}`)

    const movie = await response.json()

    if (!movie.id) return false

    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster
    }
  } catch (err) {
    return false
  }
}

export const createMovie = async ({ title, poster }: MovieFormType): Promise<false | string> => {
  try {
    const response = await fetch('http://localhost:777/movies', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ title, poster })
    })
    const newMovie = await response.json()

    if (newMovie.errorMessage) return newMovie.errorMessage
    else {
      revalidatePath('/movies')
      return false
    }
  } catch (err) {
    return 'Unexpected Error, try again'
  }
}

export const updateMovie = async (id: IDType, prevState: State, formData : FormData) => {
  const validatedFields = CreateMovieFormSchema.safeParse({
    title: formData.get('movie-title'),
    poster: formData.get('movie-poster')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Edit Movie.'
    }
  }

  const { title, poster } = validatedFields.data

  try {
    const response = await fetch(`http://localhost:777/movies/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ title, poster })
    })
    const updatedMovie = await response.json()

    console.log(updatedMovie)

    if (updatedMovie.errorMessage) {
      return {
        errors: {
          external: [updatedMovie.errorMessage]
        },
        message: updatedMovie.errorMessage
      }
    }
  } catch (err) {
    console.log(err)
    return {
      errors: {
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath(`/movies/edit-movie/${id}`)
  revalidatePath('/movies')
  redirect('/movies')
}
