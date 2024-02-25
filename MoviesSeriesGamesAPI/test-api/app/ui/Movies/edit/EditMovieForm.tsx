'use client'

import { updateMovie } from '@/app/lib/actions/moviesActions'
import Input from '../../Input'
import { useFormState } from 'react-dom'
import { MovieType } from '@/app/lib/definitions'

export default function EditMovieForm ({ id, title, poster }: MovieType) {
  const updateSerieWithID = updateMovie.bind(null, id)
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(updateSerieWithID, initialState)

  return (
    <div className='w-96 h-full flex flex-col gap-16 py-20'>
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Edit Movie.</h3>
        <form className='flex flex-col gap-5' action={dispatch}>
            <Input
              name='movie-title'
              placeholder='Title'
              describedBy='movie-title-error'
              defaultValue={title}
            />
            <div id="movie-customer-error" aria-live="polite" aria-atomic="true">
              {
                state.errors?.title &&
                  state.errors.title.map((error: string) => (
                    <p className="mt-2 text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
            <Input
              name='movie-poster'
              placeholder='Image URL'
              describedBy='movie-poster-error'
              defaultValue={poster}
            />
            <div id="movie-poster-error" aria-live="polite" aria-atomic="true">
              {
                state.errors?.poster &&
                  state.errors.poster.map((error: string) => (
                    <p className="mt-2 text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
            <div id="movie-external-error" aria-live="polite" aria-atomic="true">
              {
                state.errors?.external &&
                  state.errors.external.map((error: string) => (
                    <p className="mt-2 text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>

            <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
              UPDATE MOVIE
            </button>

            {/* <SuccesModal show={succes} message='movies Succesfully Added.' /> */}
        </form>
    </div>
  )
}
