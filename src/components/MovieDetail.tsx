import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_KEY = '4bcc16dce61a3bec384c3df4bf720b60'

interface Movie {
  id: number;
  title: string;
  overview: string;
}

const fetchMovieDetail = async (id: string) => {
  const response = await axios.get<Movie>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useQuery<Movie>(['movie', id], () =>
    fetchMovieDetail(id)
  );

  console.log(movie)

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching movie</p>;

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover mb-4 rounded-md"
        />
        <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-700 mb-4">{movie.overview}</p>
        <p>
          <strong>IMDb Rating:</strong> {movie.vote_average}
        </p>
      </div>
    </div>
  );
}

export default MovieDetail;