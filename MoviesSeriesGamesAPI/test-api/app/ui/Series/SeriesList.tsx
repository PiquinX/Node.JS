import { SeriesListType } from '@/app/lib/definitions'

interface Props {
    series: SeriesListType
}

export const SeriesList: React.FC<Props> = async ({ series }) => {
  return (
        <div className="grid grid-cols-responsive gap-10">
            {
                series.map(serie => (
                    <div key={serie.id} className="rounded border w-72 animate-appear-fast p-5 flex flex-col gap-5">
                        <h4 className='truncate'>{serie.title}</h4>
                        <img
                            className="w-full rounded"
                            src={serie.poster}
                            alt={serie.title} />
                    </div>
                ))
            }
        </div>
  )
}
