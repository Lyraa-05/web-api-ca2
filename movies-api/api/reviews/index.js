import express from 'express';
import Review from './reviewModel';
import asyncHandler from 'express-async-handler';
import authenticate from "../../authenticate";

const router = express.Router(); // eslint-disable-line

import express from "express";
import Review from "./reviewModel";
import asyncHandler from "express-async-handler";
import authenticate from "../../authenticate";

const router = express.Router();

/**
 * GET my reviews
 */
router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({ userId: req.user._id });
    res.status(200).json(reviews);
  })
);

/**
 * POST a review
 */
router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const review = await Review.create({
      movieId: req.body.movieId,
      description: req.body.review,   // map from frontend
      rating: req.body.rating,
      userId: req.user._id,
    });

    res.status(201).json(review);
  })
);

/**
 * DELETE my review
 */
router.delete(
  "/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const result = await Review.deleteOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!result.deletedCount) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(204).end();
  })
);



export default router;
