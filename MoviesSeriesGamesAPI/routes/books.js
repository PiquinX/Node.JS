import { Router } from 'express'
import { BooksController } from '../controllers/books.js'

export function createBooksRouter ({ booksModel }) {
  const BooksRouter = Router()

  const booksController = new BooksController({ booksModel })

  BooksRouter.get('', booksController.getAll)

  BooksRouter.get('/:id', booksController.getByID)

  BooksRouter.post('', booksController.create)

  BooksRouter.delete('/:id', booksController.delete)

  BooksRouter.patch('/:id', booksController.update)

  return BooksRouter
}
