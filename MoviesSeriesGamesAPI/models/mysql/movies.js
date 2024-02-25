import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviebookseriedb'
}

const connection = await mysql.createConnection(config)

export class MoviesModel {
  static async getAll () {
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM movie'
    )

    return movies
  }

  static async getByID ({ id }) {
    try {
      const [movie] = await connection.query(
        'SELECT BIN_TO_UUID(id) id, title, poster FROM movie WHERE id = UUID_TO_BIN(?);',
        [id]
      )

      return movie[0]
    } catch (e) {
      return false
    }
  }

  static async create ({ input }) {
    const {
      title,
      poster
    } = input

    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM movie'
    )

    if (movies.findIndex(
      movie => movie.title.toLowerCase() === input.title.toLowerCase()
    ) !== -1) return { error: 'The movie you are tryng to create alrady exists' }
    if (movies.findIndex(
      movie => movie.poster.toLowerCase() === input.poster.toLowerCase()
    ) !== -1) return { error: 'The movie you are tryng to create alrady exists' }

    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        'INSERT INTO movie (id, title, poster) VALUES(UUID_TO_BIN(?), ?, ?)',
        [uuid, title, poster]
      )
    } catch (e) {
      return { error: 'Error trying to create the Movie' }
    }

    const newMovie = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM movie WHERE id = UUID_TO_BIN(?)',
      [uuid]
    )

    return newMovie[0]
  }

  static async delete ({ id }) {
    const deletedMovie = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )

    try {
      await connection.query(
        'DELETE FROM movie WHERE id = UUID_TO_BIN(?)',
        [id]
      )
    } catch (e) {
      return false
    }

    return deletedMovie[0]
  }

  static async update ({ id, input }) {
    try {
      const [movie] = await connection.query(
        'SELECT title, poster FROM movie WHERE id = UUID_TO_BIN(?);',
        [id]
      )

      const newMovie = {
        ...movie[0],
        ...input
      }

      const {
        title,
        poster
      } = newMovie

      await connection.query(
        `UPDATE movie
        SET title = ?,
        poster = ?
        WHERE id = UUID_TO_BIN(?);`,
        [title, poster, id]
      )
    } catch (e) {
      return false
    }

    const [updatedMovie] = await connection.query(
      `SELECT title, poster FROM movie 
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    return updatedMovie[0]
  }
}
