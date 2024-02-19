'use client'

import { usePopUp } from '@/app/hooks/usePopUp'
import AddBookForm from './AddBookForm'

const AddBook = () => {
  const { setShow, show, popUpData } = usePopUp()

  return (
        <>
            <button
                onClick={() => setShow(true)}
                className="bg-blue-500 rounded px-3 py-2 font-medium text-white">
                + Add Book
            </button>

            {
                show &&
                <div
                    data-pop-up={popUpData}
                    className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 px-10 left-0 flex items-center justify-center'
                >
                    <div
                        className='rounded-lg animate-appear-fast border bg-white opacity-100 w-full md:w-[38rem] lg:w-[48rem] h-[60%] duration-150 flex items-center justify-center relative'
                    >
                        <button
                            onClick={() => setShow(false)}
                            className='absolute text-3xl text-gray-500  top-5 right-6'>
                            <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500"></i>
                        </button>
                        <AddBookForm handleCloseModal={() => setShow(false)} />
                    </div>
                </div>
            }

        </>
  )
}

export default AddBook
