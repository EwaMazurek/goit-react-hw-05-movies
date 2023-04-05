// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

import { Outlet, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    release_date: '',
    vote_average: '',
    overview: '',
    genres: [],
  });
  const [imageUrl, setImageUrl] = useState(``);
  const { movieId } = useParams();

  const API_KEY = `e5b5538091a13a4cec5c6a955506b824`;

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      const movieDetails = await response.data;
      setMovieDetails(movieDetails);
      setImageUrl(
        `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  const location = useLocation();
  const prevLocation = location.state?.from ?? '/goit-react-hw-05-movies/';
  return (
    <div className={css.container}>
      <Link className={css.link} to={prevLocation}>
        Go back
      </Link>
      <div className={css.movieDetails}>
        <img
          className={css.poster}
          src={imageUrl} //the beginning of this url is the same for every movie
          alt="poster"
        />
        <div>
          <h3>
            {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
          </h3>
          <p>User score: {movieDetails.vote_average}</p>
          <h4>Overview</h4>
          <p>{movieDetails.overview}</p>
          <h4>Genres</h4>
          <p>
            {movieDetails.genres.map(genre => (
              <span key={genre.id}>{genre.name} </span>
            ))}
          </p>
        </div>
      </div>

      <div className={css.links}>
        <p className={css.linksp}>
          <Link to="cast">Cast</Link>
        </p>
        <p className={css.linksp}>
          <Link to="reviews">Reviews</Link>
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
