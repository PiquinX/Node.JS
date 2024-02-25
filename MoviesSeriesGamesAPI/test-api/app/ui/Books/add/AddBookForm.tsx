import { createBook } from '@/app/lib/actions/bookActions'
import Input from '../../Input'
import { useFormState } from 'react-dom'

export default function AddBookForm () {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createBook, initialState)

  return (
    <div className='w-96 h-full flex flex-col gap-16 py-20'>
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Add a new Book to the list.</h3>
        <form className='flex flex-col gap-5' action={dispatch}>
            <Input
              name='book-title'
              placeholder='Title'
              describedBy='book-title-error'
            />
            <div id="book-customer-error" aria-live="polite" aria-atomic="true">
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
              name='book-poster'
              placeholder='Image URL'
              describedBy='book-poster-error'
            />
            <div id="book-poster-error" aria-live="polite" aria-atomic="true">
              {
                state.errors?.poster &&
                  state.errors.poster.map((error: string) => (
                    <p className="mt-2 text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
            <div id="book-external-error" aria-live="polite" aria-atomic="true">
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
              ADD BOOK
            </button>

            {/* <SuccesModal show={succes} message='Books Succesfully Added.' /> */}
        </form>
    </div>
  )
}

// const [succes, setSucces] = useState<boolean>(false)
// const { formData, handleChangePoster, handleChangeTitle, handleResetForm, error, setError, isInvalid } = useBookForm()

// const handleSubmit = async () => {
//   if (isInvalid) return
//   const result = await createBook(formData)

//   if (result) setError(result)
//   else {
//     setSucces(true)
//     setTimeout(() => {
//       setSucces(false)
//       handleCloseModal()
//       handleResetForm()
//       // IDK if revalidateTag/revalidatePath is the correct way to do it
//       revalidateTag('books')
//     }, 1000)
//   }
// }
