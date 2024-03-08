'use client'

import { updateBook } from '@/app/lib/actions/bookActions'
import Input from '../../Input'
import { useFormState } from 'react-dom'
import { BookType } from '@/app/lib/definitions'
import FormErrorMessage from '../../FormErrorMessage'

export default function EditBookForm ({ id, title, poster }: BookType) {
  const updateBookWithID = updateBook.bind(null, id)
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(updateBookWithID, initialState)

  return (
    <div className='w-96 h-full flex flex-col gap-16 py-20'>
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Edit Book.</h3>
        <form className='flex flex-col gap-5' action={dispatch}>
            <Input
              name='book-title'
              placeholder='Title'
              describedBy='book-title-error'
              defaultValue={title}
            />
            <FormErrorMessage id='book-title-error' errors={state.errors.title} />

            <Input
              name='book-poster'
              placeholder='Image URL'
              describedBy='book-poster-error'
              defaultValue={poster}
            />
            <FormErrorMessage id='book-poster-error' errors={state.errors.poster} />
            <FormErrorMessage id='book-external-error' errors={state.errors.external} />

            <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
              UPDATE BOOK
            </button>

            {/* <SuccesModal show={succes} message='Books Succesfully Added.' /> */}
        </form>
    </div>
  )
}
