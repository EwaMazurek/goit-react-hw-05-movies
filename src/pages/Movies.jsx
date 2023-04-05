import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const API_KEY = `e5b5538091a13a4cec5c6a955506b824`;
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const query = searchParams.get('query');

  const fetchMovies = async searchedMovie => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchedMovie}&language=en-US&page=1&include_adult=true`
      );
      const moviesArray = await response.data.results;
      setMovies(moviesArray);
      // navigate(`/goit-react-hw-05-movies/movies?query=${searchedMovie}`);
    } catch (error) {
      setError(error);
    }
  };

  if (query) {
    fetchMovies(query);
  }

  const handleQuery = event => {
    event.preventDefault();
    const searchPhrase = document.querySelector('input').value;
    if (searchPhrase !== '') setSearchParams({ query: searchPhrase });
    else setSearchParams({});
    fetchMovies(searchPhrase);
  };

  return (
    <>
      <form onSubmit={handleQuery}>
        <input
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      {error && <div>{error.message}</div>}
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              state={{
                from: `/goit-react-hw-05-movies/movies?${searchParams}`,
              }}
              to={`${movie.id}`}
            >
              {movie.name || movie.title}{' '}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
