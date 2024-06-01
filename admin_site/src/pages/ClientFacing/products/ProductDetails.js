/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetproductByNameQuery,
} from "../../../services/Jsonserverapi";
import "./Product.css";

export default function ProductDetails() {
  const { productId } = useParams();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetproductByNameQuery(
    `admin/product/${productId}`
  );
  const theme = useTheme();
  const [activeImg, setActiveImg] = useState(null);

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

  const handleEditProduct = async () => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDeleteProduct = async () => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await deleteProduct(productId);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: res.data.message || "Product deleted successfully",
          timer: 3000,
          showConfirmButton: false,
        });
        window.location.pathname = "/products";
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed to delete",
          text: err.data?.message || "Something went wrong!",
        });
      }
    }
  };

  return (
    <Container sx={{ my: 4 }}>
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
      {isError && (
        <Typography color="error" variant="h6" align="center">
          {error?.data?.message}
        </Typography>
      )}
      {!isError && !isLoading && data && (
        <Box sx={{display:'flex', flexDirection:'column', rowGap:8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box
                  height={"400px"}
                  width={"100%"}
                  bgcolor={"#FFF"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {activeImg && (
                    <img
                      src={activeImg}
                      alt="productImgDetails"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  )}
                </Box>
                <Box
                  display={"flex"}
                  flexDirection="row"
                  gap={1}
                  overflow={"auto"}
                >
                  {data.product.images.map((image, idx) => (
                    <img
                      src={image.url}
                      alt={image.url}
                      onClick={() => setActiveImg(image.url)}
                      onMouseEnter={() => handleImageHover(image.url)}
                      key={idx}
                      style={{
                        height: "50px",
                        cursor: "pointer",
                        border:
                          activeImg === image.url
                            ? "2px solid black"
                            : "1px solid #ccc",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h5" fontWeight={600}>
                  {data.product.title.en}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  Brand:{" "}
                  <span style={{ color: theme.palette.grey[600] }}>
                    {data.product.brand}
                  </span>
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  Size
                </Typography>
                <ul className="menuSize">
                  {data.product.sizes.map((size, index) => (
                    <li key={index}>{size}</li>
                  ))}
                </ul>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography
                    variant="body1"
                    fontSize={"0.95rem"}
                    color={theme.palette.grey[800]}
                  >
                    {data.product.rating}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={data.product.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body1">
                    {data.product.numOfReviews} REVIEWS
                  </Typography>
                </Box>
                <Box>
                  {data.product.discountPercentage > 0 && (
                    <Typography
                      variant="subtitle1"
                      component="del"
                      sx={{ color: theme.palette.grey[400] }}
                    >
                      {`LE ${data.product.originalPrice}`}
                    </Typography>
                  )}
                  <Typography variant="h6" fontWeight={700}>
                    {`LE ${data.product.priceAfterDiscount}`}
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography variant="body1" fontWeight={600}>
                    Status:
                  </Typography>
                  <Typography
                    className={data.product.stock < 1 ? "red" : "green"}
                  >
                    {data.product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight={600}>
                  About This Product
                </Typography>
                <Typography sx={{ color: theme.palette.grey[600] }}>
                  {data.product.description.en}
                </Typography>
                <Box display={"flex"} gap={2} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProduct}
                  >
                    Edit Product
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteProduct}
                  >
                    Delete Product
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{direction:'rtl'}}>
            <Grid item xs={12} md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box
                  height={"400px"}
                  width={"100%"}
                  bgcolor={"#FFF"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {activeImg && (
                    <img
                      src={activeImg}
                      alt="productImgDetails"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  )}
                </Box>
                <Box
                  display={"flex"}
                  flexDirection="row"
                  gap={1}
                  overflow={"auto"}
                >
                  {data.product.images.map((image, idx) => (
                    <img
                      src={image.url}
                      alt={image.url}
                      onClick={() => setActiveImg(image.url)}
                      onMouseEnter={() => handleImageHover(image.url)}
                      key={idx}
                      style={{
                        height: "50px",
                        cursor: "pointer",
                        border:
                          activeImg === image.url
                            ? "2px solid black"
                            : "1px solid #ccc",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h5" fontWeight={600}>
                  {data.product.title.ar}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  الماركة:{" "}
                  <span style={{ color: theme.palette.grey[600] }}>
                    {data.product.brand}
                  </span>
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  المقاس
                </Typography>
                <ul className="menuSize">
                  {data.product.sizes.map((size, index) => (
                    <li key={index}>{size}</li>
                  ))}
                </ul>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography
                    variant="body1"
                    fontSize={"0.95rem"}
                    color={theme.palette.grey[800]}
                  >
                    {data.product.rating}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={data.product.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body1">
                    {data.product.numOfReviews} التعليقات
                  </Typography>
                </Box>
                <Box>
                  {data.product.discountPercentage > 0 && (
                    <Typography
                      variant="subtitle1"
                      component="del"
                      sx={{ color: theme.palette.grey[400] }}
                    >
                      {`${data.product.originalPrice} ج.م`}
                    </Typography>
                  )}
                  <Typography variant="h6" fontWeight={700}>
                    {`${data.product.priceAfterDiscount} ج.م`}
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography variant="body1" fontWeight={600}>
                    الحالة:
                  </Typography>
                  <Typography
                    className={data.product.stock < 1 ? "red" : "green"}
                  >
                    {data.product.stock < 1 ? "غير متوفر فى المخزن" : "متوفر فى المخزن"}
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight={600}>
                  معلومات عن هذا المنتج
                </Typography>
                <Typography sx={{ color: theme.palette.grey[600] }}>
                  {data.product.description.ar}
                </Typography>
                <Box display={"flex"} gap={2} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProduct}
                  >
                    عدل المنتج
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteProduct}
                  >
                    احذف المنتج
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
