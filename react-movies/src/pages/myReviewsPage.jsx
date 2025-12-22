import { useState, useEffect, useContext } from "react";
import ReviewForm from "../components/reviewForm";
import { getMyReviews, addReview, deleteReview } from "../api/reviews-api";
import { AuthContext } from "../contexts/authContext";

const MyReviewsPage = () => {
  const { token } = useContext(AuthContext);

  const [reviewState, setReviewState] = useState({ reviews: [] });
  const [formState, setFormState] = useState({
    movieId: "",
    review: "",
    rating: 3,
  });

  useEffect(() => {
    getMyReviews(token).then(reviews => {
      setReviewState({ reviews });
    });
  }, [token]);

  const formChangeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const newReview = await addReview(formState, token);

    setReviewState({
      reviews: [...reviewState.reviews, newReview],
    });
  };

  const deleteHandler = async (index) => {
    const reviews = [...reviewState.reviews];
    const id = reviews[index]._id;

    await deleteReview(id, token);
    reviews.splice(index, 1);

    setReviewState({ reviews });
  };

  return (
    <>
      <h2>My Reviews</h2>

      {reviewState.reviews.map((r, index) => (
        <div key={r._id}>
          <p>
            Movie ID: {r.movieId} — Rating: {r.rating}
          </p>
          <button onClick={() => deleteHandler(index)}>Delete</button>
        </div>
      ))}

      <ReviewForm
        submit={formSubmitHandler}
        change={formChangeHandler}
      />
    </>
  );
};

export default MyReviewsPage;
