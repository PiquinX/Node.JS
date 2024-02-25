import EditMoviesController from '@/app/Controllers/Movies/EditMoviesController'

export default function Page ({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <EditMoviesController id={id} />
  )
}
