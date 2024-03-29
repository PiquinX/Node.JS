import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviebookseriedb'
}

const connection = await mysql.createConnection(config)

export class SeriesModel {
  static async getAll () {
    const [series] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM serie'
    )

    return series
  }

  static async getByID ({ id }) {
    try {
      const [serie] = await connection.query(
        'SELECT BIN_TO_UUID(id) id, title, poster FROM serie WHERE id = UUID_TO_BIN(?);',
        [id]
      )

      return serie[0]
    } catch (e) {
      return false
    }
  }

  static async create ({ input }) {
    const {
      title,
      poster
    } = input

    const [series] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM serie'
    )

    if (series.findIndex(
      serie => serie.title.toLowerCase() === input.title.toLowerCase()
    ) !== -1) return { error: 'The serie you are tryng to create alrady exists' }
    if (series.findIndex(
      serie => serie.poster.toLowerCase() === input.poster.toLowerCase()
    ) !== -1) return { error: 'The serie you are tryng to create alrady exists' }

    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        'INSERT INTO serie (id, title, poster) VALUES(UUID_TO_BIN(?), ?, ?)',
        [uuid, title, poster]
      )
    } catch (e) {
      return { error: 'Error trying to create the Serie' }
    }

    const newSerie = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM serie WHERE id = UUID_TO_BIN(?)',
      [uuid]
    )

    return newSerie[0]
  }

  static async delete ({ id }) {
    const deletedSerie = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, poster FROM serie WHERE id = UUID_TO_BIN(?)',
      [id]
    )

    try {
      await connection.query(
        'DELETE FROM serie WHERE id = UUID_TO_BIN(?)',
        [id]
      )
    } catch (e) {
      return false
    }

    return deletedSerie[0]
  }

  static async update ({ id, input }) {
    try {
      const [serie] = await connection.query(
        `SELECT title, poster FROM serie 
        WHERE id = UUID_TO_BIN(?);`,
        [id]
      )

      const newSerie = {
        ...serie[0],
        ...input
      }

      const {
        title,
        poster
      } = newSerie

      console.log({ title, poster, id })

      await connection.query(
        `UPDATE serie
        SET title = ?,
        poster = ?
        WHERE id = UUID_TO_BIN(?);`,
        [title, poster, id]
      )
    } catch (e) {
      return false
    }

    const [updatedSerie] = await connection.query(
      `SELECT title, poster FROM serie 
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    return updatedSerie[0]
  }
}
