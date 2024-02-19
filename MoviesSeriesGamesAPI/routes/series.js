import { Router } from 'express'
import { SeriesController } from '../controllers/series.js'

export const SeriesRouter = Router()

SeriesRouter.get('', SeriesController.getAll)

SeriesRouter.post('', SeriesController.create)

SeriesRouter.delete('/:id', SeriesController.delete)
