import { Router } from 'express'
import { MoviesController } from '../controllers/movies.js'

export const MoviesRouter = Router()

MoviesRouter.get('', MoviesController.getAll)

MoviesRouter.post('', MoviesController.create)

MoviesRouter.delete('/:id', MoviesController.delete)
