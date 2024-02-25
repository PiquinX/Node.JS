import { Router } from 'express'
import { SeriesController } from '../controllers/series.js'

export function createSeriesRouter ({ seriesModel }) {
  const SeriesRouter = Router()

  const seriesController = new SeriesController({ seriesModel })

  SeriesRouter.get('', seriesController.getAll)

  SeriesRouter.get('/:id', seriesController.getByID)

  SeriesRouter.post('', seriesController.create)

  SeriesRouter.delete('/:id', seriesController.delete)

  SeriesRouter.patch('/:id', seriesController.update)

  return SeriesRouter
}
