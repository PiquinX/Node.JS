import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'

const books = JSON.parse(readFileSync('books.json'))

export class BooksModel {
  static async getAll () {
    return books
  }

  static async create ({ input }) {
    if (books.findIndex(
      book => book.title.toLowerCase() === input.title.toLowerCase()
    ) !== -1) return { error: 'The book you are tryng to create alrady exists' }
    if (books.findIndex(
      book => book.poster.toLowerCase() === input.poster.toLowerCase()
    ) !== -1) return { error: 'The book you are tryng to create alrady exists' }

    const newBook = {
      id: randomUUID(),
      ...input
    }

    books.push(newBook)

    return newBook
  }

  static async delete ({ id }) {
    const bookIndex = books.findIndex(movie => movie.id === id)

    if (bookIndex === -1) return false

    const deletedBook = books[bookIndex]

    books.splice(bookIndex, 1)

    return deletedBook
  }
}
