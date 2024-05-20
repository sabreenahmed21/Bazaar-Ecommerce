/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "./Product.css";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetproductByNameQuery } from "../../services/Jsonserverapi";
import { Link, useParams } from "react-router-dom";
import Review from "./Review";
import { useTranslation } from "react-i18next";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemToCart } from "../../Redux/CartSlice";
import { addItemToFav } from "../../Redux/FavoriteSlice";
import "./Product.css";
import SimilarProducts from "./SimilarProducts";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function ProductDetails() {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { t, i18n } = useTranslation();
  const { data, isLoading, isError, error } = useGetproductByNameQuery(
    `/product/${productId}?lang=${i18n.language}`
  );

  const theme = useTheme();
  const [activeImg, setActiveImg] = useState(data?.product.images[0].url);
  useEffect(() => {
    if (
      data &&
      data.product &&
      data.product.images &&
      data.product.images.length > 0
    ) {
      setActiveImg(data.product.images[0].url);
    }
  }, [data]);
  const handleImageHover = (imageUrl) => {
    setActiveImg(imageUrl);
  };

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size.", {
        autoClose: 2000,
      });
      return;
    }
    if (quantity < 1) {
      toast.error("Quantity must be at least 1.", {
        autoClose: 2000,
      });
      return;
    }
    if (quantity > data.product.stock) {
      toast.error(`Only ${data.product.stock} items in stock`, {
        autoClose: 2000,
      });
      return;
    }
    const productToAdd = {
      ...data.product,
      selectedSize,
      quantity: parseInt(quantity, 10),
    };
    dispatch(addItemToCart(productToAdd));
    toast.success("Added to cart", {
      autoClose: 1000,
    });
  };

  const handleAddToFav = () => {
    dispatch(addItemToFav(data.product));
    toast.success("Added to favorites", {
      autoClose: 1000,
    });
  };

  return (
    <>
      <Container
        sx={{ my: 4, direction: i18n.language === "ar" ? "rtl" : "ltr" }}
      >
        {isLoading && (
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"50vh"}
          >
            <span className="loader"></span>
          </Box>
        )}
        {isError && error?.data?.message}
        {!isError && !isLoading && data && (
          <>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={12} md={4} my={3}>
                <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} options={{ allowClose: true }}>
                  {activeImg && (
                    <Link to={activeImg}>
                      <img
                        src={activeImg}
                        alt="productImgDetails"
                        className="mainImage"
                      />
                    </Link>
                  )}
                  {data.product.images.map((image, idx) => (
                    <Link to={image.url} key={idx}>
                      <img
                        src={image.url}
                        alt={image.url}
                        onMouseEnter={() => handleImageHover(image.url)}
                        key={idx}
                        className="subImage"
                        style={{
                          border:
                            activeImg === image.url
                              ? "1px solid black"
                              : "none",
                        }}
                      />
                    </Link>
                  ))}
                </LightGallery>
              </Grid>

              <Grid item xs={12} md={7.5} my={3}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}
                >
                  <Typography variant="h5" color="initial" fontWeight={600}>
                    {data.product.title}
                  </Typography>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{
                        color: theme.palette.text.main,
                        textTransform: "capitalize",
                      }}
                    >
                      {t("products.brand")}:{" "}
                      <Typography
                        variant="span"
                        sx={{ color: theme.palette.grey[600] }}
                      >
                        {data.product.brand}
                      </Typography>
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{
                        color: theme.palette.text.main,
                        textTransform: "capitalize",
                      }}
                    >
                      {t("products.size")}:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {data.product.sizes.map((size, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          onClick={() => setSelectedSize(size)}
                          style={{
                            backgroundColor:
                              selectedSize === size ? "lightgray" : "",
                          }}
                        >
                          {size}
                        </Button>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{
                        color: theme.palette.text.main,
                        textTransform: "capitalize",
                      }}
                    >
                      {t("products.quantity")}:
                    </Typography>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      style={{ width: "50px" }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      direction: "ltr",
                      justifyContent: i18n.language === "ar" ? "end" : "",
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontSize={"0.95rem"}
                      color={theme.palette.grey[800]}
                    >
                      {data.product.averageRating}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={data.product.rating}
                      precision={0.5}
                    />
                    <Typography variant="body1" color="initial">
                      ({data.product.numOfReviews} {t("products.reviews")})
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "block",
                    }}
                  >
                    {data.product.discountPercentage !== null &&
                    data.product.discountPercentage !== 0 ? (
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
                        {i18n.language === "ar"
                          ? `${data.product.originalPrice} ${t("products.EGP")}`
                          : `${t("products.EGP")} ${
                              data.product.originalPrice
                            }`}
                      </Typography>
                    ) : (
                      " "
                    )}
                    <Typography
                      variant="subtitle1"
                      component="p"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.5,
                        fontSize: "1.5rem",
                        fontFamily: '"Roboto Condensed", sans-serif',
                      }}
                    >
                      {i18n.language === "ar"
                        ? `${data.product.priceAfterDiscount} ${t(
                            "products.EGP"
                          )}`
                        : `${t("products.EGP")} ${
                            data.product.priceAfterDiscount
                          }`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", alignItems: "center", columnGap: 1 }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {t("products.status")}:
                    </Typography>
                    <Typography
                      className={data.product.stock < 1 ? "red" : "green"}
                    >
                      {data.product.stock < 1
                        ? t("products.OutOfStock")
                        : t("products.InStock")}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      color="initial"
                      fontWeight={600}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {t("products.aboutThisProduct")}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.grey[600],
                        textTransform: "lowercase",
                      }}
                    >
                      {data.product.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", mt: 2 }}>
                    <Button
                      size="large"
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: 600,
                        px: 3,
                        color: theme.palette.text.main,
                        backgroundColor: theme.palette.text.orange,
                        border: "1px solid #fff",
                        ":hover": {
                          backgroundColor: theme.palette.text.Lightorange,
                          transition: "all  0.5s  ease-in-out",
                        },
                        width: "fit-content",
                      }}
                      onClick={handleAddToCart}
                    >
                      {t("products.addCart")}
                    </Button>
                    <Button
                      size="large"
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: 600,
                        px: 3,
                        color: theme.palette.text.main,
                        backgroundColor: theme.palette.text.red,
                        border: "1px solid #fff",
                        ":hover": {
                          backgroundColor: theme.palette.text.Lightred,
                          transition: "all  0.5s  ease-in-out",
                        },
                        width: "fit-content",
                      }}
                      onClick={handleAddToFav}
                    >
                      {t("products.addFav")}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <SimilarProducts
              productId={productId}
              category={data?.product.category}
              subcategory={data?.product.subcategory}
            />
            <Review productId={data.product._id} />
          </>
        )}
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
}
