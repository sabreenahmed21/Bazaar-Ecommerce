import React, { useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
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

export default function DiscountProducts() {
  const { t, i18n } = useTranslation();
  const storedLanguage = i18n.language;
  const link = `products/discounted?lang=${storedLanguage}`;
  const { data, isLoading, isError, error } = useGetproductByNameQuery(link);

  const prevEl = useRef(null);
  const nextEl = useRef(null);

  return (
    <Paper
      sx={{
        overflow: "hidden",
        my: 5,
        pb:5,
        direction: storedLanguage === "ar" ? "rtl" : "ltr",
        backgroundColor: "#FFA741",
        boxShadow:'none'
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          mb: 1
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textTransform: "uppercase",
            fontSize: "2rem",
            fontWeight: 500,
            letterSpacing: "0.02rem",
            fontFamily: "Luckiest Guy",
          }}
        >
          {t("products.discountedProducts")}
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
        <LoadingProductCard count={1} />
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
          {error?.data?.message || "Error Loading Products"}
        </Typography>
      ) : !data || data.products.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ mt: 2, textAlign: "center", fontWeight: 400 }}
        >
          No Products Found
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
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 }
          }}
        >
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
