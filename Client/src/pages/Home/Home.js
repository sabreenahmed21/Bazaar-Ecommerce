import React from "react";
import { Container } from "@mui/material";

import Hero from "../../components/Hero/Hero.js";
import Products from "../../pages/Products/Products.js";
import ScrollToTop from "../../components/Hero/ScrollToTop.js";
import Footer from "../../pages/Footer/Footer.js";
import Feature from "../../components/Feature.js";
import Brands from "../../components/Brand/Brands.js";
import NewFeaturedProducts from "../Products/NewFeaturedProducts.js";
import Shopping from "../../components/Shopping.js";
import DiscountProducts from "../Products/DiscountProducts.js";
import { ToastContainer } from "react-toastify";
import AssestsCategory from "../AssestsCategory.js";

export default function Home() {
  return (
    <>
    <ToastContainer position="top-right" />
      <Container>
        <Hero />
        <NewFeaturedProducts/>
        <AssestsCategory/>
        <Brands />
        <Products />
        <Shopping/>
        <Feature />
        <DiscountProducts />
        <ScrollToTop />
      </Container>
      <Footer />
    </>
  );
}
