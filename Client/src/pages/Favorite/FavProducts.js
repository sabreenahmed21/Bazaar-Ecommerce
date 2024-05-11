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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeItemFromFav } from "../../Redux/FavoriteSlice";
import ProductList from "../Products/ProductList";

export default function FavProducts() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const items = useSelector((state) => state.favorite.items);
  console.log(items);

  const handleRemoveFromFav = (item) => {
    dispatch(removeItemFromFav(item));
    toast.success("Removed from favorites", {
      autoClose: 3000,
    });
  };

  return (
    <Container>
      <Box sx={{my:5}}>
        <Typography
          variant="h3"
          sx={{
            textTransform: "capitalize",
            fontSize: "3rem",
            fontWeight: 600,
            letterSpacing: "0.02rem",
          }}
        >
          your Favorites products
        </Typography>
        {items.length > 0 ? (
          <Stack
            justifyContent={{ xs: "center", md: "left" }}
            alignItems={"center"}
            flexWrap={"wrap"}
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
              <Paper>
                <ProductList item={item} key={item.id || index} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    width: "100%",
                    mb: 1,
                    ml: 1,
                  }}
                >
                  <Button
                    onClick={() => handleRemoveFromFav(item)}
                    sx={{
                      color: theme.palette.text.red,
                      backgroundColor: theme.palette.text.Lightred,
                    }}
                  >
                    Remove From Favorite
                  </Button>
                </Box>
              </Paper>
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
