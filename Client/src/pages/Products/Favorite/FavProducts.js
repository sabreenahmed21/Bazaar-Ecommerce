import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeItemFromFav } from "../../../Redux/FavoriteSlice";
import ProductList from "../ProductList";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function FavProducts() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const items = useSelector((state) => state.favorite.items);
  console.log(items);
  const { t, i18n } = useTranslation();

  const handleRemoveFromFav = (event, item) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(removeItemFromFav(item));
    toast.success("Removed from favorites", {
      autoClose: 1000,
    });
  };

  return (
    <Container>
      <ToastContainer position="top-right" />
      <Box sx={{ my: 5, direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
        <Typography
          variant="h3"
          sx={{
            textTransform: "capitalize",
            fontSize: "3rem",
            fontWeight: 600,
            letterSpacing: "0.02rem",
            mb: 3,
          }}
        >
          {t("products.favProducts")}
        </Typography>
        {items.length > 0 ? (
          <Stack
            justifyContent={{ xs: "center", md: "left" }}
            alignItems="center"
            flexWrap="wrap"
            gap={3}
            sx={{
              [theme.breakpoints.up("xs")]: {
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
              },
              [theme.breakpoints.up("md")]: {
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
              },
            }}
          >
            {items?.map((item, index) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <Paper>
                  <ProductList item={item} key={item.id || index} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      width: "100%",
                      px:1,
                      pb:1
                    }}
                  >
                    <Button
                      onClick={(event) => handleRemoveFromFav(event, item)}
                      sx={{
                        color: theme.palette.text.red,
                        backgroundColor: theme.palette.text.Lightred,
                      }}
                    >
                      {t("products.removefromfav")}
                    </Button>
                  </Box>
                </Paper>
              </Link>
            ))}
          </Stack>
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
            Your favorites is empty.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
