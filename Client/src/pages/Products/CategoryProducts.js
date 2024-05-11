import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetproductByNameQuery } from "../../services/Jsonserverapi.js";
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography } from "@mui/material";
import FilteredProducts from "./Allproducts/FilteredProducts.js";
import ProductsView from "./Allproducts/ProductsView.js";
import Footer from "../Footer/Footer.js";
import { discountOptions, ratingOptions } from "./Allproducts/Available.js";

function ProductPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const category = query.get("category");
  const subcategory = query.get("subcategory");
  const { i18n } = useTranslation();
  const storedLanguage = i18n.language;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState([0, 3000]);
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("none");
  const [totalPages, setTotalPages] = useState(1);

  const link = useMemo(() => {
    let url = `products?page=${currentPage}&category=${category}&lang=${storedLanguage}&subcategory=${subcategory}`;
    if (selectedBrands.length > 0) {
      url += `&brand=${selectedBrands.join(",")}`;
    }
    if (selectedSizes.length > 0) {
      url += `&sizes=${selectedSizes.join(",")}`;
    }
    if (price) {
      url += `&priceAfterDiscount[gte]=${price[0]}&priceAfterDiscount[lte]=${price[1]}`;
    }
    if (selectedDiscount) {
      const option = discountOptions.find(
        (opt) => opt.value === selectedDiscount
      );
      if (option) {
        url += `&${option.queryParam}`;
      }
    }
    if (rating) {
      const option = ratingOptions.find((opt) => opt.value === rating);
      if (option) {
        url += `&${option.queryParam}`;
      }
    }
    if (sort !== "none") {
      url += `&sort=${sort}`;
    }
    return url;
  }, [
    storedLanguage,
    currentPage,
    selectedBrands,
    selectedSizes,
    price,
    selectedDiscount,
    rating,
    sort,
    category,
    subcategory,
  ]);
  const { data, isLoading, error, isError } = useGetproductByNameQuery(link);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedBrands,
    selectedSizes,
    price,
    selectedDiscount,
    rating,
    sort,
    category,
    subcategory,
  ]);

  const handleSizeChange = useCallback((event) => {
    const { value } = event.target;
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(value)
        ? prevSizes.filter((size) => size !== value)
        : [...prevSizes, value]
    );
  }, []);

  const handleBrandChange = useCallback((event) => {
    const { value } = event.target;
    setSelectedBrands((prevBrands) =>
      prevBrands.includes(value)
        ? prevBrands.filter((brand) => brand !== value)
        : [...prevBrands, value]
    );
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedDiscount("");
    setRating("");
    setPrice([0, 3000]);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (data && data.totalProductsCount && data.resultPerPage) {
      setTotalPages(Math.ceil(data.totalProductsCount / data.resultPerPage));
    }
  }, [data]);

  return (
    <>
      <Container sx={{ my: 5, direction:storedLanguage === 'ar'? 'rtl':'ltr' }}>
        <Typography
          variant="h4"
          color="initial"
          sx={{
            textTransform: "uppercase",
            fontSize: "2rem",
            fontWeight: 500,
            letterSpacing: "0.02rem",
            fontFamily: "Luckiest Guy",
            mb: 4,
          }}
        >
          category: {category} , subcategory: {subcategory}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FilteredProducts
              resetFilters={resetFilters}
              handleBrandChange={handleBrandChange}
              handleSizeChange={handleSizeChange}
              selectedBrands={selectedBrands}
              selectedSizes={selectedSizes}
              price={price}
              setPrice={setPrice}
              selectedDiscount={selectedDiscount}
              setSelectedDiscount={setSelectedDiscount}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <ProductsView
              data={data}
              isLoading={isLoading}
              isError={isError}
              error={error}
              sort={sort}
              handleSortChange={handleSortChange}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ProductPage;
