import Link from 'next/link'
import { getBooks } from '../../lib/actions/bookActions'
import { BooksList } from '../../ui/Books/show/BooksList'

const BooksController = async () => {
  const books = await getBooks()

  if (books) {
    return (
    <>
      <div className='flex items-end mb-5'>
        <Link
          href='/books/create-book'
          className="bg-blue-500 rounded px-3 py-2 font-medium text-white"
          scroll={false}
        >
          + Add Book
        </Link>
      </div>
      <BooksList books={books} />
    </>
    )
  } else return <div>Something happened...</div>
}

export default BooksController
