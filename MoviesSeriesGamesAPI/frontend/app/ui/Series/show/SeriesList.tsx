import { SeriesListType } from '@/app/lib/definitions'
import Link from 'next/link'

interface Props {
    series: SeriesListType
}

export const SeriesList: React.FC<Props> = ({ series }) => {
  return (
        <div
            className="grid grid-cols-responsive gap-10"
            data-testid='series-list'
        >
            {
                series.map(serie => (
                    <Link
                        key={serie.id}
                        href={`/series/edit-serie/${serie.id}`}
                        scroll={false}
                        className="rounded border w-72 animate-appear-fast p-5 flex flex-col gap-5"
                    >
                        <h4 className='truncate'>{serie.title}</h4>
                        <img
                            className="w-full rounded"
                            src={serie.poster}
                            alt={serie.title} />
                    </Link>
                ))
            }
        </div>
  )
}
