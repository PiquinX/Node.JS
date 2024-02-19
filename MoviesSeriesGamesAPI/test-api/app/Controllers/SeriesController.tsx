import { getSeries } from '../lib/actions'
import AddSerie from '../ui/Series/AddSerie'
import { SeriesList } from '../ui/Series/SeriesList'

const SeriesController = async () => {
  const series = await getSeries()

  if (series) {
    return (
    <>
      <div className='flex items-end mb-5'>
        <AddSerie />
      </div>
      <SeriesList series={series} />
    </>
    )
  } else return <div>Something happened...</div>
}

export default SeriesController
