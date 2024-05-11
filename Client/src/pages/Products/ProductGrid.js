import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MdAddShoppingCart,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../Redux/CartSlice";
import { addItemToFav, removeItemFromFav } from "../../Redux/FavoriteSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductGrid({ item, id }) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const isFavorited = useSelector((state) =>
    state.favorite.items.some((favItem) => favItem._id === item._id)
  )

  const storedLanguage = i18n.language;
  const dispatch = useDispatch();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addItemToCart(item));
    toast.success("Added to cart", {
      autoClose: 3000,
    });
  };

  const handleAddToFav = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addItemToFav(item));
    toast.success("Added to favorites", {
      autoClose: 3000,
    });
  };

  const handleRemoveFromFav = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(removeItemFromFav(item));
    toast.success("Removed from favorites", {
      autoClose: 3000,
    });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: { xs: 322 },
          minWidth: { xs: 255, sm: 264 },
          height: "415px",
          ":hover .favorite-icon": {
            display: "block",
            transition: "0.35s ease",
          },
        }}
        key={id}
      >
        <Box
          sx={{
            position: "relative",
            height: 241,
            overflow: "hidden",
            ":hover img": { transform: "scale(1.1)", transition: "0.35s" },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: "100%",
              backgroundSize: "contain",
              objectFit: "contain",
              transition: "transform 0.35s ease",
            }}
            title={item.title}
            image={item.images[0].url}
          />
          {isFavorited ? (
            <MdOutlineFavorite
              onClick={handleRemoveFromFav}
              className="favorite-icon"
              style={{color:'red'}}
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
                px: 2,
                ":hover": {
                  opacity: 1,
                  transition: "opacity 0.35s",
                },
              }}
            >
              <Typography variant="h6" component="div">
                - {item.discountPercentage}%
              </Typography>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <CardContent sx={{ p: "16px 16px 0" }}>
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
                textAlign: "-webkit-auto",
                mb: 0,
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
              }}
            >
              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  fontWeight: 500,
                  lineHeight: 1.5,
                  fontSize: "1.3rem",
                  color: theme.palette.text.red,
                  fontFamily: '"Yanone Kaffeesatz", sans-serif',
                }}
              >
                {storedLanguage === "ar"
                  ? `${item.priceAfterDiscount} ${t("products.EGP")}`
                  : `${t("products.EGP")} ${item.priceAfterDiscount}`}
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
                  {storedLanguage === "ar"
                    ? `${item.originalPrice} ${t("products.EGP")}`
                    : `${t("products.EGP")} ${item.originalPrice}`}
                </Typography>
              ) : (
                " "
              )}
            </Box>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", px: 2 }}>
          <Button
            size="large"
            sx={{
              textTransform: "capitalize",
              gap: "4px",
              fontWeight: 600,
              px: "7px",
              color: theme.palette.text.main,
              backgroundColor: "#fff",
              borderColor: theme.palette.text.main,
              borderStyle: "solid",
              borderWidth: "1.5px",
              ":hover": {
                backgroundColor: theme.palette.text.main,
                color: "#fff",
                transition: "all  0.5s  ease-in-out",
              },
              width: "-webkit-fill-available",
            }}
            onClick={(e) => handleAddToCart(e)}
          >
            <MdAddShoppingCart fontSize="small" />
            {t("products.addCart")}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
