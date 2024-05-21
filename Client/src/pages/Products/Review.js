import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Rating,
  Paper,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";
import { selectCurrentUser } from "../../Redux/UserSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useFetchProductReviewsQuery,
  useAddProductReviewMutation,
  useDeleteProductReviewMutation,
  useEditProductReviewMutation,
} from "../../services/Jsonserverapi";
import { useTranslation } from "react-i18next";

export default function Review({ productId }) {
  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation();

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentUser = useSelector(selectCurrentUser);

  const {
    data: reviewsData,
    error,
    isLoading,
    refetch,
  } = useFetchProductReviewsQuery({productId,currentPage});

  const [addReview] = useAddProductReviewMutation();
  const [deleteReview] = useDeleteProductReviewMutation();
  const [editReview] = useEditProductReviewMutation();

  useEffect(() => {
    if (reviewsData) {
      setReviews(reviewsData.data);
      setTotalPages(Math.ceil(reviewsData.totalCount / 4));
    }
  }, [reviewsData, currentPage]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId).unwrap();
      setReviews(reviews.filter((review) => review._id !== reviewId));
      toast.success("Review deleted successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error(`Failed to delete review: ${error.data.message}`);
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
      const updatedReview = { review: reviewText, rating: Number(rating) };
      await editReview({ reviewId, review: updatedReview }).unwrap();
      setReviews(
        reviews.map((review) =>
          review._id === reviewId ? { ...review, ...updatedReview } : review
        )
      );
      toast.success("Review updated successfully", { autoClose: 1000 });
      setEditingReviewId(null);
    } catch (error) {
      toast.error(`Failed to update review: ${error.data.message}`);
    }
  };

  const submitReview = async () => {
    try {
      await addReview({
        productId,
        review: { review: newReviewText, rating: Number(newRating) },
      }).unwrap();
      refetch();
      setNewReviewText("");
      setNewRating("");
      toast.success("Review added successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error(`Failed to submit review: ${error.data.message}`);
    }
  };

  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleNavigateToLogin = () => {
    window.location.pathname = "/login";
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    refetch(productId, page);
  };

  const renderReviewForm = () => (
    <Box mb={2}>
      <TextField
        label={t("reviews.writeAReview")}
        multiline
        fullWidth
        value={newReviewText}
        onChange={(e) => setNewReviewText(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        select
        label={t("productsFilter.rateFilter")}
        value={newRating}
        onChange={(e) => setNewRating(e.target.value)}
        helperText={t("reviews.pleaseSelectYourRating")}
        fullWidth
      >
        {ratingLabels.map((label, index) => (
          <MenuItem key={index + 1} value={index + 1}>
            {index + 1} - {label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
        onClick={submitReview}
        disabled={editingReviewId !== null}
      >
        {t("reviews.submitNewReview")}
      </Button>
    </Box>
  );

  const renderReview = (review) => {
    const user = review.user || {};
    const userId = user._id;
    return (
      <Paper sx={{ p: 2, mb: 2, direction: "ltr" }} key={review._id}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            pb: 1,
            mb: 1,
          }}
        >
          <Avatar src={user.avatar?.url} alt={user.name || "user"} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            {user.name}
          </Typography>
        </Box>
        {editingReviewId === review._id ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              flexDirection: "column",
              rowGap: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Edit Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <TextField
              select
              label="Rating"
              value={rating}
              onChange={handleRatingChange}
            >
              {ratingLabels.map((label, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1} - {label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              onClick={() => handleEditReview(review._id)}
              color="primary"
              variant="contained"
            >
              {t("reviews.saveChanges")}
            </Button>
          </Box>
        ) : (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflowWrap: "break-word",
                wordBreak: "break-word",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {review.review}
            </Typography>
            <Rating
              value={review.rating}
              readOnly
              sx={{ mt: 1, fontSize: "1.2rem" }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Reviewed on {formatDate(review.createdAt)}
            </Typography>
          </>
        )}
        {currentUser && currentUser.data.user._id === userId && (
          <Box mt={2} display={"flex"} gap={2}>
            <Button
              onClick={() => {
                setEditingReviewId(review._id);
                setReviewText(review.review);
                setRating(review.rating);
              }}
              variant="outlined"
            >
              {t("reviews.editReview")}
            </Button>
            <Button
              onClick={() => handleDeleteReview(review._id)}
              variant="outlined"
              color="secondary"
            >
              {t("reviews.deleteReview")}
            </Button>
          </Box>
        )}
      </Paper>
    );
  };

  return (
    <>
      {!currentUser ? (
        <Box sx={{ mt: 2, textAlign: "start", mb: 2 }}>
          <Typography variant="body1">
            <Button variant="outlined" onClick={handleNavigateToLogin}>
              {t("reviews.writeReview")}
            </Button>
          </Typography>
        </Box>
      ) : (
        renderReviewForm()
      )}
      {isLoading ? (
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <span className="loader"></span>
        </Box>
      ) : error ? (
        <Typography variant="body1" color="textSecondary">
          {t("reviews.error")}
        </Typography>
      ) : (
        <>
          <Typography variant="body1" sx={{ my: 2, color: "#000" }}>
            show {reviewsData.results} of {reviewsData.totalCount}
          </Typography>
          {reviews.map(renderReview)}
          <Box
            sx={{
              py: 4,
              direction: "ltr",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {totalPages > 1 && (
              <Pagination
                page={currentPage}
                count={totalPages}
                onChange={handlePageChange}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
}
