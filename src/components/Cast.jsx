import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Cast = () => {
  const { movieId } = useParams();
  const API_KEY = `e5b5538091a13a4cec5c6a955506b824`;
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w200';
  const [cast, setCast] = useState([
    {
      name: '',
      character: '',
      id: '',
      profile_path: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
      )
      .then(response => setCast(response.data.cast))
      .then(setIsLoading(false))
      .catch(error => console.error(error));
  }, []);
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `${imgBaseUrl}${actor.profile_path}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsgfb4WykS46wzrFiLuo-omAwymcGQWkHY9Q&usqp=CAU'
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cast;
