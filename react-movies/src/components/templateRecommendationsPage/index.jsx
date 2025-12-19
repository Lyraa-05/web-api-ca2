import React from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function RecommendationsPageTemplate({ movies, title, action }) {
  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <MovieList action={action} movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default RecommendationsPageTemplate;