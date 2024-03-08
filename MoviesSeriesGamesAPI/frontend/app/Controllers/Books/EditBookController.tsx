'use server'

import { redirect } from 'next/navigation'
import { getBookByID } from '../../lib/actions/bookActions'
import EditBook from '@/app/ui/Books/edit/EditBook'

interface Props {
    id: string
}

const EditBookController: React.FC<Props> = async ({ id }) => {
  const book = await getBookByID({ id })

  if (book) return <EditBook id={id} poster={book.poster} title={book.title} />
  else {
    redirect('/books')
  }
}

export default EditBookController
