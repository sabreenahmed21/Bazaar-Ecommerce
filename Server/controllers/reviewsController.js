import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
import Review from "../models/reviewModel.js";
import apiFeatures from "../utils/apiFeatures.js";

export const createReview = asyncWrapper(async (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: {
      review: newReview,
    },
  });
});

export const getAllReviewsForProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const reviewsPerPage = 4;
  const reviewsQuery = Review.find({ product: productId });
  const features = new apiFeatures(reviewsQuery, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate(reviewsPerPage);

  const reviews = await features.query;
  const totalCount = await Review.countDocuments({ product: productId });

  if (!reviews || reviews.length === 0) {
    return next(errorHandler("No reviews found for this product", 404));
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    results: reviews.length,
    totalCount,
    data: reviews,
  });
});

const errorHandler = (message, statusCode) => {
  return new appError(message, statusCode);
};

export const getReview = asyncWrapper(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new appError("No review found with that ID", 404));
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: review,
  });
});

export const updateReview = asyncWrapper(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findByIdAndUpdate(reviewId, req.body, {
    new: true,
  });
  if (!review) {
    return next(new appError("No review found with that ID", 404));
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: review,
  });
});

export const deleteReview = asyncWrapper(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findByIdAndDelete(reviewId);
  await review.constructor.calcAverageRatings(review.product);
  if (!review) {
    return next(new appError("No review found with that ID", 404));
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Review deleted successfully",
  });
});
