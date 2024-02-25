import { MoviesListType } from '@/app/lib/definitions'
import Link from 'next/link'

interface Props {
    movies: MoviesListType
}

export const MoviesList: React.FC<Props> = async ({ movies }) => {
  return (
        <div className="grid grid-cols-responsive gap-10">
            {
                movies.map(movie => (
                    <Link
                        href={`/movies/edit-movie/${movie.id}`}
                        scroll={false}
                        key={movie.id}
                        className="rounded animate-appear-fast border w-72 p-5 flex flex-col gap-5">
                        <h4 className='truncate'>{movie.title}</h4>
                        <img
                            className="w-full h-full rounded"
                            src={movie.poster}
                            alt={movie.title} />
                    </Link>
                ))
            }
        </div>
  )
}
