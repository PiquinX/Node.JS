import { MoviesModel } from '../models/movies.js'
import { validateMovie } from '../schemas/movie.js'

export class MoviesController {
  static async getAll (req, res) {
    const movies = await MoviesModel.getAll()

    if (!movies) return res.status(404).send({ errorMessage: 'error 404, movies not found' })

    return res.send(movies)
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (result.error) return res.status(404).send({ errorMessage: result.error.errorMessage })

    const newMovie = await MoviesModel.create({ input: result.data })

    if (newMovie.error) {
      return res.status(404).send({
        errorMessage: newMovie.error
      })
    }

    return res.status(201).send(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const deletedMovie = await MoviesModel.delete({ id })

    if (deletedMovie === false) {
      return res.status(404).send({
        errorMessage: 'error 404, movie not found'
      })
    }

    return res.send(deletedMovie)
  }
}
