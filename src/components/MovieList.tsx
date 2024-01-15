import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = '4bcc16dce61a3bec384c3df4bf720b60'

interface Movie {
  id: number;
  title: string;
}

const fetchMovies = async () => {
  const response = await axios.get<{results: Movie[]}>(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
  );
  return response.data.results;
};

function MovieList() {
  const { data: movies, isLoading, isError } = useQuery<Movie[]>('movies', fetchMovies);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching movies</p>;

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;