import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getPopularMovies,
    getMovie, getMovieCredits, getMovieReccomendations,
    getMovieImages, getMovieReviews,getGenres} from '../tmdb-api'; 

const router = express.Router();

// movie routes to be added


router.get('/discover', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const discoverMovies = await getMovies(page);
    res.status(200).json(discoverMovies);
}));


export default router;
