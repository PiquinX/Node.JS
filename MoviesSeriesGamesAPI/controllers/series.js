import { SeriesModel } from '../models/series.js'
import { validateSerie } from '../schemas/series.js'

export class SeriesController {
  static async getAll (req, res) {
    const series = await SeriesModel.getAll()

    if (!series) return res.status(404).send({ errorMessage: 'error 404, series not found' })

    return res.send(series)
  }

  static async create (req, res) {
    const result = validateSerie(req.body)

    if (result.error) return res.status(404).send({ errorMessage: result.error.errorMessage })

    const newSeries = await SeriesModel.create({ input: result.data })

    if (newSeries.error) {
      return res.status(404).send({
        errorMessage: newSeries.error
      })
    }

    return res.status(201).send(newSeries)
  }

  static async delete (req, res) {
    const { id } = req.params

    const deletedSerie = await SeriesModel.delete({ id })

    if (deletedSerie === false) {
      return res.status(404).send({
        errorMessage: 'error 404, serie not found'
      })
    }

    return res.send(deletedSerie)
  }
}
