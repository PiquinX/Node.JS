import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'

const series = JSON.parse(readFileSync('series.json'))

export class SeriesModel {
  static async getAll () {
    return series
  }

  static async create ({ input }) {
    if (series.findIndex(
      serie => serie.title.toLowerCase() === input.title.toLowerCase()
    ) !== -1) return { error: 'The serie you are tryng to create alrady exists' }
    if (series.findIndex(
      serie => serie.poster.toLowerCase() === input.poster.toLowerCase()
    ) !== -1) return { error: 'The serie you are tryng to create alrady exists' }

    const newSerie = {
      id: randomUUID(),
      ...input
    }

    series.push(newSerie)

    return newSerie
  }

  static async delete ({ id }) {
    const serieIndex = series.findIndex(movie => movie.id === id)

    if (serieIndex === -1) return false

    const deletedSerie = series[serieIndex]

    series.splice(serieIndex, 1)

    return deletedSerie
  }
}
