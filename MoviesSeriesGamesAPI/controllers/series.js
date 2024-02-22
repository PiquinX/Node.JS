import { validateSerie } from '../schemas/series.js'

export class SeriesController {
  constructor ({ seriesModel }) {
    this.seriesModel = seriesModel
  }

  getAll = async (req, res) => {
    const series = await this.seriesModel.getAll()

    if (!series) return res.status(404).send({ errorMessage: 'error 404, series not found' })

    return res.send(series)
  }

  create = async (req, res) => {
    const result = validateSerie(req.body)

    if (result.error) return res.status(404).send({ errorMessage: result.error.errorMessage })

    const newSeries = await this.seriesModel.create({ input: result.data })

    if (newSeries.error) {
      return res.status(404).send({
        errorMessage: newSeries.error
      })
    }

    return res.status(201).send(newSeries)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const deletedSerie = await this.seriesModel.delete({ id })

    if (deletedSerie === false) {
      return res.status(404).send({
        errorMessage: 'error 404, serie not found'
      })
    }

    return res.send(deletedSerie)
  }
}
