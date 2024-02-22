import { Router } from 'express'
import { MoviesController } from '../controllers/movies.js'

export function createMoviesRouter ({ moviesModel }) {
  const MoviesRouter = Router()

  const moviesController = new MoviesController({ moviesModel })

  MoviesRouter.get('', moviesController.getAll)

  MoviesRouter.post('', moviesController.create)

  MoviesRouter.delete('/:id', moviesController.delete)

  return MoviesRouter
}
