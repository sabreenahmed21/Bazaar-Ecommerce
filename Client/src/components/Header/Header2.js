// @ts-nocheck
import {
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import logo from "../../assets/logo.png";
import SearchComponent from "../Search/SearchComponent.js";
import { TiShoppingCart } from "react-icons/ti";
import { GrFavorite } from "react-icons/gr";
import { MdClose, MdSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header2() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const isLargeScreen = useMediaQuery("(min-width:769px)");
  const theme = useTheme();
  const { i18n } = useTranslation();

  const storedLanguage = i18n.language;
  const totalQuantityCart = useSelector((s) => s.cart.totalQuantity);
  const totalQuantityFav = useSelector((s) => s.favorite.totalQuantity);

  return (
    <Box
      pb={"10px"}
      sx={{
        direction: storedLanguage === "ar" ? "rtl" : "ltr",
        bgcolor: theme.palette.secondary.main,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: "15px",
          borderTop: "0.8px solid rgba(255,255,255,0.3)",
          borderBottom: "0.8px solid rgba(255,255,255,0.3)",
        }}
      >
        <img src={logo} alt="logo" sx={{ width: "auto" }} />
        {isLargeScreen ? (
          <SearchComponent toggleDrawer={toggleDrawer} />
        ) : (
          <>
            <Box flexGrow={1} />
            <IconButton
              onClick={toggleDrawer("top", true)}
              sx={{ color: "#fff" }}
            >
              <MdSearch />
            </IconButton>
          </>
        )}
        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
          sx={{ ".MuiDrawer-paperAnchorTop  ": { height: "100%" } }}
        >
          <Box sx={{ ml: "auto", p: "10px" }}>
            <IconButton
              onClick={toggleDrawer("top", false)}
              sx={{ "&:hover": { rotate: "360deg", transition: "0.5s" } }}
            >
              <MdClose />
            </IconButton>
          </Box>
          <Box sx={{ margin: "auto", marginTop: 0 }}>
            <SearchComponent toggleDrawer={toggleDrawer} />
          </Box>
        </Drawer>
        <Stack direction={"row"}>
          <Link to={"/shoppingcart"}>
            <IconButton aria-label="cart" sx={{ marginRight: "8px" }}>
              <StyledBadge
                badgeContent={totalQuantityCart}
                showZero
                sx={{
                  ".MuiBadge-badge": {
                    backgroundColor: theme.palette.text.yellow,
                  },
                }}
              >
                <TiShoppingCart fontSize={"1.8rem"} color="#fff" />
              </StyledBadge>
            </IconButton>
          </Link>
          <Link to={"/favoriteProducts"}>
            <IconButton aria-label="fav" sx={{ marginRight: "8px" }}>
              <StyledBadge
                badgeContent={totalQuantityFav}
                showZero
                sx={{
                  ".MuiBadge-badge": {
                    backgroundColor: theme.palette.text.yellow,
                  },
                }}
              >
                <GrFavorite fontSize={"1.4rem"} color="#fff" />
              </StyledBadge>
            </IconButton>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
