// @ts-nocheck
import {
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  useMediaQuery,
  Drawer,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import NavLinks from "./NavLinks";
import { BiCategory } from "react-icons/bi";
import {
  MdKeyboardArrowRight,
  MdClose,
  MdMenu,
  MdKeyboardArrowLeft,
} from "react-icons/md";

import { useTranslation } from "react-i18next";
import CategoryMenu from "../CategoryMenu";

export default function Nav() {
  const isLargeScreen = useMediaQuery("(min-width:992px)");
  const theme = useTheme();

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
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl)

  const { t, i18n } = useTranslation();
  const storedLanguage = i18n.language;

  return (
    <Box
      sx={{
        paddingBottom: "10px",
        backgroundColor: "#fff",
        direction: storedLanguage === "ar" ? "rtl" : "ltr",
        bgcolor: theme.palette.secondary.main,
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              color: theme.palette.text.main,
              width: "278px",
              bgcolor: theme.palette.grey[50],
              "&:hover": {
                bgcolor: theme.palette.grey[50],
                color: theme.palette.text.main,
              },
              [theme.breakpoints.down("sm")]: {
                width: "155px",
              },
            }}
          >
            <BiCategory fontSize={"x-large"} />
            <Typography
              sx={{ fontWeight: "600", textTransform: "capitalize", mx: "5px" }}
            >
              {t("header3.categories")}
            </Typography>
            <Box flexGrow={1} />
            {storedLanguage === "ar" ? (
              <MdKeyboardArrowLeft fontSize={"x-large"} />
            ) : (
              <MdKeyboardArrowRight fontSize={"x-large"} />
            )}
          </Button>
          <Box width={"100%"}>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                ".MuiPaper-root": {
                  width: "277px",
                  maxWidth: "100%",
                  mt: 1,
                  [theme.breakpoints.down("sm")]: {
                    width: "155px",
                  },
                },
                direction: storedLanguage === "ar" ? "rtl" : "ltr",
              }}
            >
              <CategoryMenu handleClose={handleClose} />
            </Menu>
          </Box>
        </Box>
        {isLargeScreen ? (
          <Box zIndex={2}>
            <NavLinks />
          </Box>
        ) : (
          <IconButton
            onClick={toggleDrawer("right", true)}
            sx={{ color: "#fff" }}
          >
            <MdMenu />
          </IconButton>
        )}
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          sx={{
            ".MuiDrawer-paperAnchorRight  ": { height: "100%", width: "100%" },
          }}
        >
          <Box sx={{ ml: "auto", p: "10px" }}>
            <IconButton
              onClick={toggleDrawer("right", false)}
              sx={{ "&:hover": { rotate: "360deg", transition: "0.5s" } }}
            >
              <MdClose />
            </IconButton>
          </Box>
          <Box sx={{ width: "90%", mx: "auto" }}>
            <NavLinks />
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
}
