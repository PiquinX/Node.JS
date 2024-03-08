import { createBook } from '@/app/lib/actions/bookActions'
import Input from '../../Input'
import { useFormState } from 'react-dom'
import FormErrorMessage from '../../FormErrorMessage'

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
            <FormErrorMessage id='book-title-error' errors={state.errors.title} />

            <Input
              name='book-poster'
              placeholder='Image URL'
              describedBy='book-poster-error'
            />
            <FormErrorMessage id='book-poster-error' errors={state.errors.poster} />

            <FormErrorMessage id='book-external-error' errors={state.errors.external} />

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
