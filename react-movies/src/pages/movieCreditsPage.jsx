import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMoviePage";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

const MovieCreditsPage = () => {
  const { id } = useParams();
  
  const { data: movie, error: movieError, isPending: moviePending } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  });

  const { data: credits, error: creditsError, isPending: creditsPending } = useQuery({
    queryKey: ['credits', { id: id }],
    queryFn: getMovieCredits,
  });

  if (moviePending || creditsPending) {
    return <Spinner />;
  }

  if (movieError) {
    return <h1>{movieError.message}</h1>;
  }

  if (creditsError) {
    return <h1>{creditsError.message}</h1>;
  }

  const cast = credits.cast || [];

  return (
    <PageTemplate movie={movie}>
      <Typography variant="h4" component="h2" gutterBottom>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.slice(0, 20).map((member) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
            <Card>
              {member.profile_path ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                />
              ) : (
                <CardMedia
                  component="div"
                  sx={{
                    height: 300,
                    backgroundColor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No Image
                  </Typography>
                </CardMedia>
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageTemplate>
  );
};

export default MovieCreditsPage;