import { validateBook, validatePartialBook } from '../schemas/book.js'

export class BooksController {
  constructor ({ booksModel }) {
    this.booksModel = booksModel
  }

  getAll = async (req, res) => {
    const books = await this.booksModel.getAll()

    if (!books) return res.status(404).json({ errorMessage: 'error 404, books not found' })

    return res.json(books)
  }

  getByID = async (req, res) => {
    const { id } = req.params
    const book = await this.booksModel.getByID({ id })

    if (!book) return res.status(404).json({ errorMessage: 'error 404, book not found' })

    return res.json(book)
  }

  create = async (req, res) => {
    const result = validateBook(req.body)

    if (result.error) return res.status(404).json({ errorMessage: result.error.issues[0].message })

    const newBooks = await this.booksModel.create({ input: result.data })

    if (newBooks.error) {
      return res.status(404).json({
        errorMessage: newBooks.error
      })
    }

    return res.status(201).json(newBooks)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const deletedBook = await this.booksModel.delete({ id })

    if (deletedBook === false) {
      return res.status(404).json({
        errorMessage: 'error 404, book not found'
      })
    }

    return res.json(deletedBook)
  }

  update = async (req, res) => {
    const result = validatePartialBook(req.body)
    const { id } = req.params

    if (result.error) return res.status(404).json({ errorMessage: result.error.issues[0].message })

    const updatedBook = await this.booksModel.update({ id, input: result.data })

    if (updatedBook === false) {
      return res.status(404).json({
        errorMessage: 'error 404, book not found'
      })
    }

    return res.send(updatedBook)
  }
}
