import { Container, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FilteredProducts from "./FilteredProducts.js";
import ProductsView from "./ProductsView.js";
import { useGetproductByNameQuery } from "../../../services/Jsonserverapi.js";
import { useTranslation } from "react-i18next";
import { discountOptions, ratingOptions } from "./Available.js";
import { t } from "i18next";
import Footer from "../../Footer/Footer.js";

export default function AllProducts() {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState([0, 3000]);
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("none");
  const [totalPages, setTotalPages] = useState(1);

  const link = useMemo(() => {
    let url = `products?lang=${i18n.language}&page=${currentPage}`;
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
    i18n.language,
    currentPage,
    selectedBrands,
    selectedSizes,
    price,
    selectedDiscount,
    rating,
    sort,
  ]);
  const { data, isLoading, error, isError } = useGetproductByNameQuery(link);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, selectedSizes, price, selectedDiscount, rating, sort]);

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
      <Container sx={{ my: 5 , direction: i18n.language === 'ar'? 'rtl':'ltr'}}>
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
          {t("productsFilter.Allproducts")}
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
