import React, { useRef } from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetproductByNameQuery } from "../../services/Jsonserverapi";
import { Link } from "react-router-dom";
import LoadingProductCard from "./LoadingProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./Product.css";
import { Autoplay, Navigation } from "swiper/modules";
import ProductGrid from "./ProductGrid";

const ArrowButton = ({ children, setRef }) => (
  <Box
    ref={setRef}
    sx={{
      border: "1px solid #80808052",
      cursor: "pointer",
      backgroundColor: "#138AE7",
      color: "#fff",
      ":hover": {
        backgroundColor: "#138ae71f",
        color: "#000",
        transition: "all 0.3s",
      },
    }}
  >
    {children}
  </Box>
);

export default function NewProducts() {
  const { t, i18n } = useTranslation();
  const storedLanguage = i18n.language;
  const link = `products?lang=${storedLanguage}&sort=-createdAt`;
  const { data, isLoading, isError, error } = useGetproductByNameQuery(link);
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:600px) and (max-width:899px)"
  );
  const prevEl = useRef(null);
  const nextEl = useRef(null);

  return (
    <Paper sx={{ overflow: "hidden", pb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,

          mb: 1,
          borderBottom: "1px solid #80808052",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textTransform: "uppercase",
            fontSize: "1.09rem",
            fontWeight: 600,
            letterSpacing: "0.02rem",
          }}
        >
          {t("products.newProducts")}
        </Typography>
        <Box
          display="flex"
          gap={1}
          flexDirection={storedLanguage === "ar" ? "row-reverse" : "row"}
        >
          <ArrowButton setRef={(node) => (prevEl.current = node)}>
            <IoIosArrowBack />
          </ArrowButton>
          <ArrowButton setRef={(node) => (nextEl.current = node)}>
            <IoIosArrowForward />
          </ArrowButton>
        </Box>
      </Box>
      {isLoading ? (
        isLargeScreen ? (
          <LoadingProductCard count={2} />
        ) : isMediumScreen ? (
          <LoadingProductCard count={2} />
        ) : (
          <LoadingProductCard count={1} />
        )
      ) : isError ? (
        <Typography
          variant="body1"
          color="error"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            my: 2,
          }}
        >
          {error?.data?.message || t("errorLoadingProducts")}
        </Typography>
      ) : !data || data.products.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ mt: 2, textAlign: "center", fontWeight: 400 }}
        >
          {t("noProductsFound")}
        </Typography>
      ) : (
        <Swiper
          key={storedLanguage}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          autoplay={{ delay: 6000 }}
          navigation={{ prevEl: prevEl.current, nextEl: nextEl.current }}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            540: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {" "}
          {data.products.map((item) => (
            <SwiperSlide key={item._id}>
              <Link
                to={`/product/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductGrid item={item} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Paper>
  );
}
