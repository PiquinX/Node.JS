// import { BooksModel } from './models/local/books.js'
// import { MoviesModel } from './models/local/movies.js'
// import { SeriesModel } from './models/local/series.js'
import { BooksModel } from './models/mysql/books.js'
import { MoviesModel } from './models/mysql/movies.js'
import { SeriesModel } from './models/mysql/series.js'

import { createApp } from './index.js'

createApp({
  moviesModel: MoviesModel,
  seriesModel: SeriesModel,
  booksModel: BooksModel
})
