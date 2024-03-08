import EditBookController from '@/app/Controllers/Books/EditBookController'

export default function Page ({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <EditBookController id={id} />
  )
}
