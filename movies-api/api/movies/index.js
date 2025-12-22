import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getPopularMovies,
    getMovie, getMovieCredits, getMovieRecommendations,
    getMovieImages, getMovieReviews,getGenres} from '../tmdb-api'; 

const router = express.Router();


router.get('/discover', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const discoverMovies = await getMovies(page);
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

// Get popular movies
router.get('/popular', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const popularMovies = await getPopularMovies(page);
    res.status(200).json(popularMovies);
}));

// Get all genres
router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

// Get specific movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
}));

// Get movie credits (cast/crew)
router.get('/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credits = await getMovieCredits(id);
    res.status(200).json(credits);
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const recommendations = await getMovieRecommendations(id);
    res.status(200).json(recommendations);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

// Get movie reviews
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
}));

export default router;
