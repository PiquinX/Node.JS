'use server'

import { revalidatePath } from 'next/cache'
import { MovieFormType, MovieResponseType, MoviesListType, SerieFormType, SerieResponseType, SeriesListType } from './definitions'

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

// comment the functiones once finished with the server actions, do not delete them.`
// export const createBook = async ({ title, poster }: BookFormType): Promise<false | string> => {
//   try {
//     const response = await fetch('http://localhost:777/books', {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST',
//       body: JSON.stringify({ title, poster })
//     })
//     const newBook = await response.json()

//     if (newBook.errorMessage) return newBook.errorMessage
//     else {
//       revalidatePath('/books')
//       return false
//     }
//   } catch (err) {
//     return 'Unexpected Error, try again'
//   }
// }

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
