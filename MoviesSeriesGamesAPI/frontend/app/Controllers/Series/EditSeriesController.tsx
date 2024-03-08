'use server'

import { redirect } from 'next/navigation'
import { getSerieByID } from '@/app/lib/actions/seriesActions'
import EditSerie from '@/app/ui/Series/edit/EditSerie'

interface Props {
    id: string
}

const EditSeriesController: React.FC<Props> = async ({ id }) => {
  const serie = await getSerieByID({ id })

  if (serie) return <EditSerie id={id} poster={serie.poster} title={serie.title} />
  else {
    redirect('/series')
  }
}

export default EditSeriesController
