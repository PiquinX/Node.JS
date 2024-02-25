import { getMovies } from '../../lib/actions/moviesActions'
import AddMovie from '../../ui/Movies/add/AddMovie'
import { MoviesList } from '../../ui/Movies/show/MoviesList'

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
