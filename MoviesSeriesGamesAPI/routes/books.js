import { Router } from 'express'
import { BooksController } from '../controllers/books.js'

export const BooksRouter = Router()

BooksRouter.get('', BooksController.getAll)

BooksRouter.post('', BooksController.create)

BooksRouter.delete('/:id', BooksController.delete)
