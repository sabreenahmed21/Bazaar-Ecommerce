import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addItemToFav, removeItemFromFav } from "../../Redux/FavoriteSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductList({ item, id }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const isFavorited = useSelector((state) =>
    state.favorite.items.some((favItem) => favItem._id === item._id)
  );

  const dispatch = useDispatch();

  const handleAddToFav = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addItemToFav(item));
    toast.success("Added to favorites", {
      autoClose: 1000,
    });
  };

  const handleRemoveFromFav = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(removeItemFromFav(item));
    toast.success("Removed from favorites", {
      autoClose: 1000,
    });
  };

  return (
    <>
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          ":hover .favorite-icon": {
            display: "block",
            transition: "0.35s ease",
          },
          boxShadow: "none",
        }}
        key={id}
      >
        <Box
          sx={{
            position: "relative",
            height: 200,
            ":hover img": {
              transform: "scale(1.1)",
              transition: "0.35s",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: 200,
              backgroundSize: "contain",
              objectFit: "contain",
            }}
            title={item.title}
            image={item.images[0].url}
          />
          {isFavorited ? (
            <MdOutlineFavorite
              onClick={handleRemoveFromFav}
              className="favorite-icon"
              style={{ color: "red" }}
            />
          ) : (
            <MdOutlineFavoriteBorder
              onClick={handleAddToFav}
              className="favorite-icon"
            />
          )}
          {item.discountPercentage !== null && item.discountPercentage !== 0 ? (
            <Box
              sx={{
                position: "absolute",
                top: "5%",
                left: "5%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.text.Lightblue,
                color: theme.palette.text.blue,
                px: 1,
                ":hover": {
                  opacity: 1,
                  transition: "opacity 0.35s",
                },
              }}
            >
              <Typography variant="h6" component="div" fontSize={"1rem"}>
                - {item.discountPercentage}%
              </Typography>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "-webkit-fill-available",
            p: 2,
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Stack alignItems={"center"} justifyContent={"space-between"}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontSize: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  color: theme.palette.text.main,
                  height: "43px",
                  width: "100%",
                  [theme.breakpoints.down("sm")]: {
                    maxWidth: "223px",
                  },
                }}
              >
                {item.title}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  mt: "10px",
                }}
              >
                <Rating
                  name="read-only"
                  value={item.rating}
                  readOnly
                  precision={0.5}
                  sx={{ fontSize: "1.2rem", textAlign: "start" }}
                />
                ({item.numOfReviews})
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.5,
                    fontSize: "0.99rem",
                    fontFamily: '"Roboto Condensed", sans-serif',
                  }}
                >
                  {item.priceAfterDiscount} {t("products.EGP")}
                </Typography>
                {item.discountPercentage !== null &&
                item.discountPercentage !== 0 ? (
                  <Typography
                    variant="subtitle1"
                    component="del"
                    sx={{
                      fontWeight: 500,
                      lineHeight: 1.5,
                      fontSize: "0.8rem",
                      color: theme.palette.grey[400],
                    }}
                  >
                    {item.originalPrice} {t("products.EGP")}
                  </Typography>
                ) : (
                  " "
                )}
              </Box>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
