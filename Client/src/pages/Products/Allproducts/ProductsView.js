import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiGrid41 } from "react-icons/ci";
import { TfiViewList } from "react-icons/tfi";
import { Link } from "react-router-dom";
import ProductList from "../ProductList";
import LoadingProductCard from "../LoadingProductCard";
import ProductGrid from "../ProductGrid";

export default function ProductsView({
  data,
  isError,
  error,
  isLoading,
  sort,
  handleSortChange,
  currentPage,
  handlePageChange,
  totalPages,
}) {
  const theme = useTheme();
  const [viewStyle, setViewStyle] = useState("grid");

  const handleViewStyleChange = (style) => {
    setViewStyle(style);
  };

  return (
    <>
      <Box
        sx={{
          marginBottom: 4,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box>
          <Button
            onClick={() => handleViewStyleChange("list")}
            sx={{
              height: "45px",
              backgroundColor: theme.palette.grey[100],
              mr: 1,
            }}
            style={
              viewStyle === "list"
                ? {
                    border: "2px solid",
                    borderColor: theme.palette.text.yellow,
                  }
                : {}
            }
          >
            <TfiViewList fontSize={"27px"} />
          </Button>
          <Button
            onClick={() => handleViewStyleChange("grid")}
            sx={{
              height: "45px",
              backgroundColor: theme.palette.grey[100],
            }}
            style={
              viewStyle === "grid"
                ? {
                    border: "2px solid",
                    borderColor: theme.palette.text.yellow,
                  }
                : {}
            }
          >
            <CiGrid41 fontSize={"35px"} />
          </Button>
        </Box>
        <SortDropdown sort={sort} handleSortChange={handleSortChange} />
      </Box>
      {isError && (
        <Typography
          variant="body1"
          color="red"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            my: "15px",
          }}
        >
          {error?.data?.message}😓
        </Typography>
      )}
      {isLoading && <LoadingProductCard count={6} />}
      {data && !isLoading && !isError && (
        <>
          {viewStyle === "grid" ? (
            <ProductCardGrid data={data} theme={theme} />
          ) : (
            
            <ProductCardList data={data} theme={theme} />
          )}
          <Box
            py={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {totalPages > 1 && (
              <Pagination
                page={currentPage}
                count={totalPages}
                onChange={handlePageChange}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
}

const SortDropdown = ({ sort, handleSortChange }) => {
  const { t } = useTranslation();
  return (
    <FormControl sx={{ width: "155px", textAlign: "start" }}>
      <Select value={sort} onChange={handleSortChange}>
        <MenuItem value="none">{t("productsFilter.defaultSorting")}</MenuItem>
        <MenuItem value="title">{t("productsFilter.titleA-Z")}</MenuItem>
        <MenuItem value="date">{t("productsFilter.dateOldest")}</MenuItem>
        <MenuItem value="-createdAt">{t("productsFilter.dateNewest")}</MenuItem>
        <MenuItem value="-priceAfterDiscount">
          {t("productsFilter.priceHTL")}
        </MenuItem>
        <MenuItem value="priceAfterDiscount">
          {t("productsFilter.priceLTH")}
        </MenuItem>
        <MenuItem value="-rating">{t("productsFilter.topRating")}</MenuItem>
      </Select>
    </FormControl>
  );
};

const ProductCardGrid = ({ data, theme }) => {
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={{ xs: "center", sm: "left" }}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={3}
        sx={{
          [theme.breakpoints.up("sm")]: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          [theme.breakpoints.up("lg")]: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          },
        }}
      >
        {data?.products.map((item) => (
          <Link key={item.id} to={`/product/${item._id}`}>
            <ProductGrid item={item} />
          </Link>
        ))}
      </Stack>
    </>
  );
};

const ProductCardList = ({ data, theme }) => {
  return (
    <>
      <Stack
        justifyContent={{ xs: "center", sm: "left" }}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={3}
        sx={{
          [theme.breakpoints.up("xs")]: {
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
          },
          [theme.breakpoints.up("xg")]: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          },
        }}
      >
        {data?.products.map((item) => (
          <Link key={item.id} to={`/product/${item._id}`}>
            <ProductList item={item} />
          </Link>
        ))}
      </Stack>
    </>
  );
};