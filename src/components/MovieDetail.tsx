import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const fetchMovieDetail = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`
  );
  return response.data;
};

function MovieDetail() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useQuery(['movie', id], () =>
    fetchMovieDetail(id)
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching movie</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetail;