'use server'

import { redirect } from 'next/navigation'
import { getMovieByID } from '@/app/lib/actions/moviesActions'
import EditMovie from '@/app/ui/Movies/edit/EditMovie'

interface Props {
    id: string
}

const EditMoviesController: React.FC<Props> = async ({ id }) => {
  const book = await getMovieByID({ id })

  if (book) return <EditMovie id={id} poster={book.poster} title={book.title} />
  else {
    redirect('/movies')
  }
}

export default EditMoviesController
