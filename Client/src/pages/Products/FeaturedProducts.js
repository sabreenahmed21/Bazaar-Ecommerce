/* eslint-disable react-hooks/rules-of-hooks */
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
import { Autoplay, Navigation } from "swiper/modules";
import "./Product.css";
import ProductGrid from "./ProductGrid";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const { t, i18n } = useTranslation();
  const storedLanguage = i18n.language;
  const link = `products?lang=${i18n.language}&featured=true`;
  const { data, isLoading, isError, error } = useGetproductByNameQuery(link);
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:600px) and (max-width:899px)"
  );

  const prevEl = useRef(null);
  const nextEl = useRef(null);

  const arrowStyles = {
    border: "1px solid #80808052",
    cursor: "pointer",
    ":hover": { backgroundColor: "#138ae71f", transition: "all 0.3s" },
  };

  return (
    <Paper
      sx={{
        overflow: "hidden",
        textShadow: "none",
        my: isLargeScreen ? 0 : 3,
        pb: 2,
      }}
    >
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
          {t("products.featuredProducts")}
        </Typography>
        <Box
          display="flex"
          gap={1}
          flexDirection={i18n.language === "ar" ? "row-reverse" : "row"}
        >
          <Box ref={prevEl} sx={arrowStyles}>
            <IoIosArrowBack />
          </Box>
          <Box ref={nextEl} sx={arrowStyles}>
            <IoIosArrowForward />
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        isLargeScreen ? (
          <LoadingProductCard count={1} />
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
          {error?.message || t("errorLoadingProducts")}
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
          autoplay={{ delay: 4000 }}
          navigation={{ prevEl: prevEl.current, nextEl: nextEl.current }}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            540: { slidesPerView: 2 },
            900: { slidesPerView: 1 },
          }}
        >
          {data.products.map((item) => (
            <SwiperSlide key={item._id}>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Link
                  to={`/product/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductGrid item={item} />
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Paper>
  );
}
