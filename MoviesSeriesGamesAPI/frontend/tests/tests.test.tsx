import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MoviesList } from '../app/ui/Movies/show/MoviesList'
import { booksMock, moviesMock, seriesMock } from './mocks'
import { BooksList } from '../app/ui/Books/show/BooksList'
import { SeriesList } from '../app/ui/Series/show/SeriesList'

describe('Movies', () => {
  test('Should render a list of Movies', () => {
    render(<MoviesList movies={moviesMock} />)

    expect(screen.getByTestId('movies-list').childElementCount).toBeGreaterThan(0)
  })
})

describe('Books', () => {
  test('Should render a list of Books', () => {
    render(<BooksList books={booksMock} />)

    expect(screen.getByTestId('books-list').childElementCount).toBeGreaterThan(0)
  })
})

describe('Series', () => {
  test('Should render a list of Series', () => {
    render(<SeriesList series={seriesMock} />)

    expect(screen.getByTestId('series-list').childElementCount).toBeGreaterThan(0)
  })
})
