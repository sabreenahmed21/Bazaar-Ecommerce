import { Box, Button, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductsView from "./ProductsView";

export default function Products() {
  return (
    <Container sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Link to={"/addProduct"}>
          <Button
            variant="outlined"
            sx={{ textTransform: "capitalize", fontSize: "1.5rem" }}
          >
            add new product
          </Button>
        </Link>
        <ProductsView/>
      </Box>
    </Container>
  );
}
