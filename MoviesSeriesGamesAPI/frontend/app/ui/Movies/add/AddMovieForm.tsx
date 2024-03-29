import { createMovie } from '@/app/lib/actions/moviesActions'
import { useState } from 'react'
import SuccesModal from '../../SuccesModal'
import { useMoviesForm } from '@/app/hooks/useMoviesForm'
import ControlledInput from '../../ControlledInput'

export default function AddMovieForm ({ handleCloseModal }: { handleCloseModal: () => void}) {
  const [succes, setSucces] = useState<boolean>(false)
  const { formData, handleChangePoster, handleChangeTitle, handleResetForm, error, setError, isInvalid } = useMoviesForm()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (isInvalid) return
    const result = await createMovie(formData)

    if (result) setError(result)
    else {
      setSucces(true)
      setTimeout(() => {
        setSucces(false)
        handleCloseModal()
        handleResetForm()
      }, 1000)
    }
  }

  return (
    <div className='w-96 h-full flex flex-col gap-16 py-20'>
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Add a new Movie to the list.</h3>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <ControlledInput
              handleChange={handleChangeTitle}
              value={formData.title}
              name='movie-title'
              placeholder='Title'
            />
            <ControlledInput
              handleChange={handleChangePoster}
              value={formData.poster}
              name='movie-poster'
              placeholder='Image URL'
            />
            {
              error &&
              <div className='text-red-500'>
                {error}
              </div>
            }
            <button disabled={isInvalid} className={`${isInvalid ? '' : 'hover:bg-blue-600 hover:text-white duration-200'} w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600`}>
              ADD MOVIE
            </button>

            <SuccesModal show={succes} message='Movie Succesfully Added.' />
        </form>
    </div>
  )
}
