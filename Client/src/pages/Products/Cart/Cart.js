import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Cart() {
  const { t } = useTranslation();
  const items = useSelector((state) => state.cart.items);
  const totalPrice = items.reduce((total, item) => {
    return total + item.priceAfterDiscount * item.quantity;
  }, 0);
  const theme = useTheme();
  return (
    <Container>
      <Box sx={{ my: 5 }}>
        <Typography
          variant="h3"
          sx={{
            textTransform: "capitalize",
            fontSize: "3rem",
            fontWeight: 600,
            letterSpacing: "0.02rem",
            mb: "inherit",
          }}
        >
          {t("cart.yourShoppingCart")}
        </Typography>
        {items.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="cart table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: 600 }}>
                    {t("cart.image")}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: 600 }}>
                    {t("cart.title")}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: 600 }}>
                    {t("cart.size")}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: 600 }}>
                    {t("cart.price")}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: 600 }}>
                    {t("cart.quantity")}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: 600 }}>
                    {t("cart.action")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right">
                      <Typography
                        variant="subtitle1"
                        component="div"
                        fontWeight={"bold"}
                      >
                        {t("cart.totalPrice")}
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2} align="left">
                      <Typography
                        variant="subtitle1"
                        component="div"
                        fontWeight={"bold"}
                      >
                        {totalPrice.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box width={"100%"}>
              <Link to={"/checkoutProducts"}>
                <Button
                  size="large"
                  sx={{
                    my: 3,
                    mx: "auto",
                    textTransform: "capitalize",
                    gap: "4px",
                    width: "25%",
                    fontWeight: 600,
                    px: "7px",
                    backgroundColor: theme.palette.text.main,
                    color: "#fff",
                    borderColor: theme.palette.text.main,
                    borderStyle: "solid",
                    borderWidth: "1.5px",
                    display: "flex",
                    ":hover": {
                      backgroundColor: theme.palette.text.main,
                      color: "#fff",
                      transition: "all  0.5s  ease-in-out",
                    },
                  }}
                >
                  {t("cart.checkout")}
                </Button>
              </Link>
            </Box>
          </>
        ) : (
          <Typography
            variant="body1"
            color="initial"
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              my: 5,
              fontSize: "1.2rem",
              fontWeight: 500,
            }}
          >
            {t("cart.yourShoppingCartIsEmpty")}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Cart;
