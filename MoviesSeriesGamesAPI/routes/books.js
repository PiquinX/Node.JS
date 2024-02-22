import { Router } from 'express'
import { BooksController } from '../controllers/books.js'

export function createBooksRouter ({ booksModel }) {
  const BooksRouter = Router()

  const booksController = new BooksController({ booksModel })

  BooksRouter.get('', booksController.getAll)

  BooksRouter.post('', booksController.create)

  BooksRouter.delete('/:id', booksController.delete)

  return BooksRouter
}
