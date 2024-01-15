import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = '4bcc16dce61a3bec384c3df4bf720b60'

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="border p-4 rounded-md shadow-md">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-40 object-cover mb-2 rounded-md"
            />
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
          </Link>
          <p className="text-gray-700">{movie.overview}</p>
          <p className="mt-2">
            <strong>IMDb Rating:</strong> {movie.vote_average}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;