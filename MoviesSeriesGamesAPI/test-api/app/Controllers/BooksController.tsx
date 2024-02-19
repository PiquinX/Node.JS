import { getBooks } from '../lib/actions'
import AddBook from '../ui/Books/AddBook'
import { BooksList } from '../ui/Books/BooksList'

const BooksController = async () => {
  const books = await getBooks()

  if (books) {
    return (
    <>
      <div className='flex items-end mb-5'>
        <AddBook />
      </div>
      <BooksList books={books} />
    </>
    )
  } else return <div>Something happened...</div>
}

export default BooksController
