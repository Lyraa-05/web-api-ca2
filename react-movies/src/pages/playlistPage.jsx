import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import AddToFavoritesIcon from "../components/cardIcons/addToFavourites";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const PlaylistMoviesPage = () => {
  const { playlists: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const playlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = playlistMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  // Handle empty playlist
  if (movieIds.length === 0) {
    return (
      <PageTemplate
        title="Your Watch List"
        movies={[]}
        action={(movie) => {
          return (
            <>
              <AddToFavoritesIcon movie={movie} />
              <RemoveFromPlaylistIcon movie={movie} />
            </>
          );
        }}
      />
    );
  }

  const movies = playlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  return (
    <PageTemplate
      title="Your Watch List"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromPlaylistIcon movie={movie} />
          </>
        );
      }}
    />
  );
};

export default PlaylistMoviesPage;