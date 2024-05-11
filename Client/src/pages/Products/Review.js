import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Rating,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import { selectCurrentUser } from "../../Redux/UserSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetproductByNameQuery } from "../../services/Jsonserverapi";
import { useTranslation } from "react-i18next";

export default function Review({ productId }) {
  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);
  const { t } = useTranslation();

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentUser = useSelector(selectCurrentUser);
  const accessToken = currentUser?.token;

  const { error, data, isLoading, refetch } = useGetproductByNameQuery(
    `/product/${productId}/reviews`,
    async () => {
      const response = await axios.get(
        `$process.env.REACT_APP_URL/api/product/$productId/reviews`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },
    {
      cacheTime: 0,
      staleTime: 30000,
      optimisticUpdate: true,
    }
  );

  useEffect(() => {
    if (data) {
      setReviews(data.data);
    }
  }, [data]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/api/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const updatedReviews = reviews.filter(
        (review) => review._id !== reviewId
      );
      setReviews(updatedReviews);
      toast.success("Review deleted successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error(
        `Failed to delete review: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/api/reviews/${reviewId}`,
        { review: reviewText, rating },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const updatedReview = response.data.data;
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId ? { ...review, ...updatedReview } : review
      );
      setReviews(updatedReviews);
      toast.success("Review updated successfully", { autoClose: 1000 });
      setEditingReviewId(null);
    } catch (error) {
      toast.error(
        `Failed to update review: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };
  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const submitReview = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/api/product/${productId}/reviews`,
        { review: newReviewText, rating: newRating },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      refetch();
      setNewReviewText("");
      setNewRating("");
      toast.success("Review added successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error(
        "Failed to submit review: " +
          (error.response?.data?.message || error.message),
        { autoClose: 1000 }
      );
    }
  };

  return (
    <>
      {!currentUser ? (
        <Box sx={{ mt: 2, textAlign: "start", mb: 2 }}>
          <Typography variant="body1">
            <Button
              variant="outlined"
              onClick={() => (window.location.pathname = "/login")}
            >
              {t("reviews.writeReview")}
            </Button>
          </Typography>
        </Box>
      ) : (
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
        error.data.message
      ) : reviews.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          {t("reviews.error")}
        </Typography>
      ) : (
        reviews.map((review) => (
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
              <Avatar
                src={review.user?.avatar.url}
                alt={review.user.name || "user"}
              />
              <Typography variant="body1" sx={{ ml: 2 }}>
                {review.user.name}
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Reviewed on {formatDate(review.createdAt)}
                </Typography>
              </>
            )}
            {currentUser && currentUser.data.user._id === review.user._id ? (
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
            ) : null}
          </Paper>
        ))
      )}
    </>
  );
}
