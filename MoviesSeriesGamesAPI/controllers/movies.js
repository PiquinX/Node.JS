import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class MoviesController {
  constructor ({ moviesModel }) {
    this.moviesModel = moviesModel
  }

  getAll = async (req, res) => {
    const movies = await this.moviesModel.getAll()

    if (!movies) return res.status(404).send({ errorMessage: 'error 404, movies not found' })

    return res.send(movies)
  }

  getByID = async (req, res) => {
    const { id } = req.params
    const movie = await this.moviesModel.getByID({ id })

    if (!movie) return res.status(404).json({ errorMessage: 'error 404, movie not found' })

    return res.json(movie)
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) return res.status(404).send({ errorMessage: result.error.errorMessage })

    const newMovie = await this.moviesModel.create({ input: result.data })

    if (newMovie.error) {
      return res.status(404).send({
        errorMessage: newMovie.error
      })
    }

    return res.status(201).send(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const deletedMovie = await this.moviesModel.delete({ id })

    if (deletedMovie === false) {
      return res.status(404).send({
        errorMessage: 'error 404, movie not found'
      })
    }

    return res.send(deletedMovie)
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)
    const { id } = req.params

    if (result.error) return res.status(404).json({ errorMessage: result.error.issues[0].message })

    const updatedMovie = await this.moviesModel.update({ id, input: result.data })

    if (updatedMovie === false) {
      return res.status(404).json({
        errorMessage: 'error 404, movie not found'
      })
    }

    return res.send(updatedMovie)
  }
}
