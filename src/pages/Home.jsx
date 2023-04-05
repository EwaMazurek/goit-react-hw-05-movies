import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = `e5b5538091a13a4cec5c6a955506b824`;
  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
      );
      const trendingMoviesArray = await response.data.results;
      setTrendingMovies(trendingMoviesArray);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h2>Trending Today</h2>
      {error && <div>{error.message}</div>}
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.name || movie.title} </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
