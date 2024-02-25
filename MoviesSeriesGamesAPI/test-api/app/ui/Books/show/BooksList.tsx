import { BooksListType } from '@/app/lib/definitions'
import Link from 'next/link'

interface Props {
    books: BooksListType
}

export const BooksList: React.FC<Props> = async ({ books }) => {
  return (
        <div className="grid grid-cols-responsive gap-10">
            {
                books.map(book => (
                    <Link
                        href={`/books/edit-book/${book.id}`}
                        scroll={false}
                        key={book.id}
                        className="rounded animate-appear-fast border w-72 p-5 flex flex-col gap-5"
                    >
                        <h4 className='truncate'>{book.title}</h4>
                        <img
                            className="w-full h-full rounded"
                            src={book.poster}
                            alt={book.title} />
                    </Link>
                ))
            }
        </div>
  )
}
