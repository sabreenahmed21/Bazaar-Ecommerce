import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetproductByNameQuery } from "../../../services/Jsonserverapi";
import ProductGrid from "./ProductGrid";

export default function ProductsView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("none");
  const [totalPages, setTotalPages] = useState(1);

  const link = `products?page=${currentPage}${
    sort !== "none" ? `&sort=${sort}` : ""
  }`;
  const { data, isLoading, error, isError } = useGetproductByNameQuery(link);

  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    if (data && data.totalProductsCount && data.resultPerPage) {
      setTotalPages(Math.ceil(data.totalProductsCount / data.resultPerPage));
    }
  }, [data]);
  return (
    <>
      <Box
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
          <Typography
            variant="body1"
            color="initial"
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          >
            Total Products:
          </Typography>
          <Typography variant="body1" color="initial">
            {data?.totalProductsCount}
          </Typography>
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
          {error?.error}😓
        </Typography>
      )}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "50vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        data && (
          <>
            <ProductCardGrid data={data} />
            <Box
              sx={{
                py: 4,
                direction: "ltr",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
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
        )
      )}
    </>
  );
}

const SortDropdown = ({ sort, handleSortChange }) => {
  return (
    <FormControl sx={{ width: "155px", textAlign: "start" }}>
      <Select value={sort} onChange={handleSortChange}>
        <MenuItem value="none">Default Sorting</MenuItem>
        <MenuItem value="title">Title A-Z</MenuItem>
        <MenuItem value="date">Date Oldest</MenuItem>
        <MenuItem value="-createdAt">Date Newest</MenuItem>
        <MenuItem value="-priceAfterDiscount">Price High to Low</MenuItem>
        <MenuItem value="priceAfterDiscount">Price Low to High</MenuItem>
        <MenuItem value="-rating">Top Rating</MenuItem>
      </Select>
    </FormControl>
  );
};

const ProductCardGrid = ({ data }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={{ xs: "center", sm: "left" }}
      alignItems={"center"}
      flexWrap={"wrap"}
      gap={3}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      }}
      width={"100%"}
    >
      {data?.products.map((item) => (
        <Link key={item.id} to={`/product/${item._id}`}>
          <ProductGrid item={item} />
        </Link>
      ))}
    </Stack>
  );
};
