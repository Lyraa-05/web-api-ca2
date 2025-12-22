import express import express from 'express';
import Review from './reviewModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

router.get('/', async (req, res) => {
    console.log(req.user);
    const tasks = await Review.find({ userId: `${req.user._id}`});
    res.status(200).json(tasks);
});

reviews for specific movie
router.get('/movie/:movieId', asyncHandler(async (req, res) => {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.status(200).json(reviews);
}));

router.post('/', asyncHandler(async (req, res) => {
    const newReview = req.body;
    newReview.userId = req.user._id;
    const review = await Review(newTask).save();
    res.status(201).json(task);
}));

router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Review.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'Review Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find review' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await Review.deleteOne({
        _id: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
});



export default router;
