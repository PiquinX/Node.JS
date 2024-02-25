import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviebookseriedb'
}

const connection = await mysql.createConnection(config)

export class BooksModel {
  static async getAll () {
    const [books] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM book;'
    )

    return books
  }

  static async getByID ({ id }) {
    try {
      const [book] = await connection.query(
        'SELECT BIN_TO_UUID(id) id, title, poster FROM book WHERE id = UUID_TO_BIN(?);',
        [id]
      )

      return book[0]
    } catch (e) {
      return false
    }
  }

  static async create ({ input }) {
    const {
      title,
      poster
    } = input

    const [books] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM book;'
    )

    if (books.findIndex(
      book => book.title.toLowerCase() === input.title.toLowerCase()
    ) !== -1) return { error: 'The book you are tryng to create alrady exists' }
    if (books.findIndex(
      book => book.poster.toLowerCase() === input.poster.toLowerCase()
    ) !== -1) return { error: 'The book you are tryng to create alrady exists' }

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        'INSERT INTO book (id, title, poster) VALUES(UUID_TO_BIN(?), ?, ?);',
        [uuid, title, poster]
      )
    } catch (e) {
      return { error: 'Error trying to create the Book' }
    }

    const newBook = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM book WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )

    return newBook[0]
  }

  static async delete ({ id }) {
    const deletedBook = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM book WHERE id = UUID_TO_BIN(?);',
      [id]
    )

    try {
      await connection.query(
        'DELETE FROM book WHERE id = UUID_TO_BIN(?);',
        [id]
      )
    } catch (e) {
      return false
    }

    return deletedBook[0]
  }

  static async update ({ id, input }) {
    try {
      const [book] = await connection.query(
        `SELECT title, poster FROM book 
        WHERE id = UUID_TO_BIN(?);`,
        [id]
      )

      const newBook = {
        ...book[0],
        ...input
      }

      const {
        title,
        poster
      } = newBook

      await connection.query(
        `UPDATE book
        SET title = ?,
        poster = ?
        WHERE id = UUID_TO_BIN(?);`,
        [title, poster, id]
      )
    } catch (e) {
      return false
    }

    const [updatedBook] = await connection.query(
      `SELECT title, poster FROM book 
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    return updatedBook[0]
  }
}
