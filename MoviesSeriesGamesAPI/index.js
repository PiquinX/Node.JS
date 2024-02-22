import express, { json } from 'express'
import cors from 'cors'
import { createMoviesRouter } from './routes/movies.js'
import { createSeriesRouter } from './routes/series.js'
import { createBooksRouter } from './routes/books.js'

export function createApp ({ moviesModel, booksModel, seriesModel }) {
  const app = express()

  app.use(json())
  app.use(cors())

  app.disable('x-powered-by')

  app.use('/movies', createMoviesRouter({ moviesModel }))
  app.use('/series', createSeriesRouter({ seriesModel }))
  app.use('/books', createBooksRouter({ booksModel }))

  const PORT = process.env.PORT ?? 777

  app.listen(PORT, () => {
    console.log(`Server Listening on Port: http://localhost:${PORT}`)
  })
}
