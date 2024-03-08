// export type IDType = `${string}-${string}-${string}-${string}-${string}`
export type IDType = string

// Books
export interface BookType {
    id: IDType
    title: string
    poster: string
}
export type BookResponseType = BookType

export type BookFormType = Omit<BookType, 'id'>

export type State = {
    errors?: {
      title?: string[]
      poster?: string[]
      external?: string[]
    }
    message?: string | null
}

// Series
export interface SerieType {
    id: IDType
    title: string
    poster: string
}
export type SerieResponseType = SerieType

export type SerieFormType = Omit<SerieType, 'id'>

// Movies
export interface MovieType {
    id: IDType
    title: string
    poster: string
}
export type MovieResponseType = MovieType

export type MovieFormType = Omit<MovieType, 'id'>

// Lists
export type BooksListType = BookType[]
export type MoviesListType = MovieType[]
export type SeriesListType = SerieType[]

// URLs
export type WhichPage = 'movies' | 'books' | 'series'

// Errors
export interface ErrorType {
    errorMessage: string
}
