'use server'

import { revalidatePath } from 'next/cache'
import { BookResponseType, BookType, BooksListType, State, IDType } from '../definitions'
import { CreateBookFormSchema } from '../schemas'
import { redirect } from 'next/navigation'

export const getBooks = async (): Promise<BooksListType | false> => {
  try {
    const response = await fetch('http://localhost:777/books')

    const books = await response.json()

    return books.map((book: BookResponseType) => ({
      id: book.id,
      title: book.title,
      poster: book.poster
    }))
  } catch (err) {
    return false
  }
}

export const getBookByID = async ({ id }: { id: string }): Promise<BookType | false> => {
  try {
    const response = await fetch(`http://localhost:777/books/${id}`)

    const book = await response.json()

    if (!book.id) return false

    return {
      id: book.id,
      title: book.title,
      poster: book.poster
    }
  } catch (err) {
    return false
  }
}

export const createBook = async (prevState: State, formData : FormData) => {
  const validatedFields = CreateBookFormSchema.safeParse({
    title: formData.get('book-title'),
    poster: formData.get('book-poster')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Book.'
    }
  }

  const { title, poster } = validatedFields.data

  try {
    const response = await fetch('http://localhost:777/books', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ title, poster })
    })
    const newBook = await response.json()

    console.log(newBook)

    if (newBook.errorMessage) {
      return {
        errors: {
          external: [newBook.errorMessage]
        },
        message: newBook.errorMessage
      }
    }
  } catch (err) {
    console.log(err)
    return {
      errors: {
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath('/books')
  redirect('/books')
}

export const updateBook = async (id: IDType, prevState: State, formData : FormData) => {
  const validatedFields = CreateBookFormSchema.safeParse({
    title: formData.get('book-title'),
    poster: formData.get('book-poster')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Edit Book.'
    }
  }

  const { title, poster } = validatedFields.data

  try {
    const response = await fetch(`http://localhost:777/books/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ title, poster })
    })
    const updatedBook = await response.json()

    console.log(updatedBook)

    if (updatedBook.errorMessage) {
      return {
        errors: {
          external: [updatedBook.errorMessage]
        },
        message: updatedBook.errorMessage
      }
    }
  } catch (err) {
    console.log(err)
    return {
      errors: {
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath('/books')
  redirect('/books')
}
