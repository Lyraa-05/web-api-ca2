import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieRecommendations } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RecommendationsPageTemplate from "../components/templateRecommendationsPage";
import AddToFavoritesIcon from '../components/cardIcons/addToFavourites';
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
const MovieRecommendationsPage = () => {
  const { id } = useParams();

  //getMovie query to get movie title for title in ReccomendationsPageTemplate
  const { data: movie, error: movieError, isPending: moviePending } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  });

  const { data: recommendations, error: recsError, isPending: recsPending } = useQuery({
    queryKey: ['recommendations', { id: id }],
    queryFn: getMovieRecommendations,
  });

  if (moviePending || recsPending) {
    return <Spinner />;
  }

  if (movieError) {
    return <h1>{movieError.message}</h1>;
  }

  if (recsError) {
    return <h1>{recsError.message}</h1>;
  }

  const movies = recommendations.results || [];

return (
  <RecommendationsPageTemplate
    title={`Movies similar to ${movie.title}`}
    movies={movies}
    action={(movie) => {
      return (
        <>
          <AddToFavoritesIcon movie={movie} />
          <AddToPlaylistIcon movie={movie} />
        </>
      )
    }}
  />
);
};

export default MovieRecommendationsPage;