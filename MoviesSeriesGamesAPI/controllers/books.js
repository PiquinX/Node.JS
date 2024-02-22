import { validateBook } from '../schemas/book.js'

export class BooksController {
  constructor ({ booksModel }) {
    this.booksModel = booksModel
  }

  getAll = async (req, res) => {
    const books = await this.booksModel.getAll()

    if (!books) return res.status(404).send({ errorMessage: 'error 404, books not found' })

    return res.send(books)
  }

  create = async (req, res) => {
    const result = validateBook(req.body)

    if (result.error) return res.status(404).send({ errorMessage: result.error.issues[0].message })

    const newBooks = await this.booksModel.create({ input: result.data })

    if (newBooks.error) {
      return res.status(404).send({
        errorMessage: newBooks.error
      })
    }

    return res.status(201).send(newBooks)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const deletedBook = await this.booksModel.delete({ id })

    if (deletedBook === false) {
      return res.status(404).send({
        errorMessage: 'error 404, book not found'
      })
    }

    return res.send(deletedBook)
  }
}
