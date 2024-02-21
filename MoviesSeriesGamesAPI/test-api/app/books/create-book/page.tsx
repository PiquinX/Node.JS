'use client'

import { handleCloseModal } from '@/app/lib/utlis'
import AddBookForm from '@/app/ui/Books/AddBookForm'
import Link from 'next/link'
import { useEffect, useId } from 'react'

interface ClickEvent extends MouseEvent {
    target: HTMLElement
}

export default function Page () {
  const popUpData = useId()

  const handleClick = (event: ClickEvent) => {
    handleCloseModal({
      isRedirectable: event.target.getAttribute('data-pop-up') === popUpData,
      newPath: '/books'
    })
  }

  useEffect(() => {
    addEventListener('click', handleClick)

    return () => {
      removeEventListener('click', handleClick)
    }
  }, [])

  return (
        <div
            data-pop-up={popUpData}
            className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 px-10 left-0 flex items-center justify-center'
        >
            <div
                className='rounded-lg animate-appear-fast border bg-white opacity-100 w-full md:w-[38rem] lg:w-[48rem] h-[60%] duration-150 flex items-center justify-center relative'
            >
                <Link
                    href='/books'
                    className='absolute text-3xl text-gray-500  top-5 right-6'>
                    <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500"></i>
                </Link>
                <AddBookForm />
            </div>
        </div>
  )
}
