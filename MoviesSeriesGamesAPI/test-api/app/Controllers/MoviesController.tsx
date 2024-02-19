import { getMovies } from '../lib/actions'
import AddMovie from '../ui/Movies/AddMovie'
import { MoviesList } from '../ui/Movies/MoviesList'

const MoviesController = async () => {
  const movies = await getMovies()

  if (movies) {
    return (
    <>
      <div className='flex items-end mb-5'>
        <AddMovie />
      </div>
      <MoviesList movies={movies} />
    </>
    )
  } else return <div>Something happened...</div>
}

export default MoviesController
