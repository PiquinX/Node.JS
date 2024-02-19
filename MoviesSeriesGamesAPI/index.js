import express, { json } from 'express'
import cors from 'cors'
import { MoviesRouter } from './routes/movies.js'
import { SeriesRouter } from './routes/series.js'
import { BooksRouter } from './routes/books.js'

const app = express()

app.use(json())
app.use(cors())

app.disable('x-powered-by')

app.use('/movies', MoviesRouter)
app.use('/series', SeriesRouter)
app.use('/books', BooksRouter)

const PORT = process.env.PORT ?? 777

app.listen(PORT, () => {
  console.log(`Server Listening on Port: http://localhost:${PORT}`)
})
