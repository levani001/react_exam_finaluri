import { useQuery } from 'react-query';
import axios from 'axios';

const API_KEY = '4bcc16dce61a3bec384c3df4bf720b60'

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

const fetchMovies = async () => {
  const response = await axios.get<{ results: Movie[] }>(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
  );
  return response.data.results;
};

const useMovies = () => {
  return useQuery<Movie[]>('movies', fetchMovies);
};

export default useMovies;