import { BooksModel } from '../models/books.js'
import { validateBook } from '../schemas/book.js'

export class BooksController {
  static async getAll (req, res) {
    const books = await BooksModel.getAll()

    if (!books) return res.status(404).send({ errorMessage: 'error 404, books not found' })

    return res.send(books)
  }

  static async create (req, res) {
    const result = validateBook(req.body)

    if (result.error) return res.status(404).send({ errorMessage: result.error.issues[0].message })

    const newBooks = await BooksModel.create({ input: result.data })

    if (newBooks.error) {
      return res.status(404).send({
        errorMessage: newBooks.error
      })
    }

    return res.status(201).send(newBooks)
  }

  static async delete (req, res) {
    const { id } = req.params

    const deletedBook = await BooksModel.delete({ id })

    if (deletedBook === false) {
      return res.status(404).send({
        errorMessage: 'error 404, book not found'
      })
    }

    return res.send(deletedBook)
  }
}
