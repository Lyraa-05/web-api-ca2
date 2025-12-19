import React, { useState } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import AddToFavoritesIcon from "../components/cardIcons/addToFavourites";

const PopularMoviesPage = (props) => {
    const [page, setPage] = useState(1);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['popular', page],
        queryFn: () => getPopularMovies(page),  // Use arrow function
        keepPreviousData: true,
    })

    if (isPending){
        return <Spinner />
    }

    if (isError){
        return <h1>{error.message}</h1>
    }

    const movies = data.results;
    const totalPages = Math.min(data.total_pages, 500);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return(
        <PageTemplate
            title="Popular Movies"
            movies={movies}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
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
export default PopularMoviesPage;