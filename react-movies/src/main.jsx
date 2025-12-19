import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from "./pages/homePage";
import MovieReviewPage from "./pages/movieReviewPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favouriteMoviesPage";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";
import PlaylistMoviesPage from "./pages/playlistPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/playlists" element={<PlaylistMoviesPage/>}/>
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/:id/credits" element={<MovieCreditsPage />} />
            <Route path="/movies/:id/recommendations" element={<MovieRecommendationsPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage /> } />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage/>}/>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
