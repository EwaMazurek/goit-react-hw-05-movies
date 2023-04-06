import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Reviews = () => {
  const { movieId } = useParams();
  const API_KEY = `e5b5538091a13a4cec5c6a955506b824`;
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
      )
      .then(response => {
        setReviews(response.data.results);
        console.log(response.data.results);
      })
      .then(setIsLoading(false))
      .catch(error => console.error(error));
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {reviews.length === 0 ? (
        <p>This movie hasn't been reviewed yet</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h5>AUTHOR: {review.author}</h5>
              <p dangerouslySetInnerHTML={{ __html: review.content }}></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Reviews;
