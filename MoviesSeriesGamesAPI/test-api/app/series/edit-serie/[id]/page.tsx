import EditSeriesController from '@/app/Controllers/Series/EditSeriesController'

export default function Page ({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <EditSeriesController id={id} />
  )
}
