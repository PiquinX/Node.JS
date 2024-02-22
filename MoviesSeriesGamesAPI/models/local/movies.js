import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'

const movies = JSON.parse(readFileSync('movies.json'))

export class MoviesModel {
  static async getAll () {
    return movies
  }

  static async create ({ input }) {
    if (movies.findIndex(
      movie => movie.title.toLowerCase() === input.title.toLowerCase()
    ) !== -1) return { error: 'The movie you are tryng to create alrady exists' }
    if (movies.findIndex(
      movie => movie.poster.toLowerCase() === input.poster.toLowerCase()
    ) !== -1) return { error: 'The movie you are tryng to create alrady exists' }

    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    const deletedMovie = movies[movieIndex]

    movies.splice(movieIndex, 1)

    return deletedMovie
  }
}
