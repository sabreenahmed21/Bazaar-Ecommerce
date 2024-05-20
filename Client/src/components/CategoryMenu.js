import React from "react";
import categories from "./Categories";
import { CgMoreO } from "react-icons/cg";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  Box,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CategoryMenu({ handleClose }) {
  const navigate = useNavigate();
  const handleMenuItemClick = (item) => {
    const link = `/category-products?category=${item.category}&subcategory=${item.subcategory}`;
    navigate(link);
    handleClose();
  };
  const { t, i18n } = useTranslation();
  const storedLanguage = i18n.language;
  const theme = useTheme();
  return (
    <>
      {categories.map((category, index) => (
        <>
          <MenuItem
            key={index}
            sx={{
              ":hover": {
                transition: "ease-in-out 0.2s",
                backgroundColor: "transparent",
              },
              [theme.breakpoints.down("sm")]: {
                px: "6px",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                textTransform: "capitalize",
                mb: "0px",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.8rem",
                },
              }}
            >
              {t(`header3.menuItemsCategories.${category.title}`)}
            </Typography>
          </MenuItem>
          {category.items.slice(0, 3).map((item) => (
            <MenuItem key={item.id} onClick={() => handleMenuItemClick(item)}>
              <ListItem
                component="a"
                sx={{
                  color: "#000",
                  textAlign: "justify",
                  gap: 1,
                  ":hover": {
                    color: theme.palette.text.orange,
                    transition: "ease-in-out 0.2s",
                    backgroundColor: "transparent",
                  },
                  ":not(:last-child)": {
                    borderBottom: "1px solid #0000000d",
                  },
                  py: "4px",
                  [theme.breakpoints.down("sm")]: {
                    px: "0px",
                  },
                }}
              >
                {item.icon}
                <ListItemText
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      ".css-10hburv-MuiTypography-root": {
                        fontSize: "0.8rem",
                      },
                    },
                  }}
                  primary={t(`header3.menuItemsCategories.${item.title}`)}
                />
              </ListItem>
            </MenuItem>
          ))}
          {category.items.length > 2 && (
            <MenuItem
              key={index}
              sx={{
                ":hover .show": { display: "block" },
                position: "relative",
                ":hover": { backgroundColor: "transparent" },
              }}
            >
              <ListItem
                component="a"
                sx={{
                  color: "#000",
                  textAlign: "justify",
                  gap: 1,
                  ":hover": {
                    color: theme.palette.text.orange,
                    transition: "ease-in-out 0.2s",
                  },
                  [theme.breakpoints.down("sm")]: {
                    px: 0,
                  },
                }}
              >
                <CgMoreO />
                <ListItemText
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      ".css-10hburv-MuiTypography-root": {
                        fontSize: "0.8rem",
                      },
                    },
                  }}
                  primary={t("header3.menuItemsCategories.more")}
                />
                <Box flexGrow={1} />
                {storedLanguage === "ar" ? (
                  <IoMdArrowDropleft />
                ) : (
                  <IoMdArrowDropright />
                )}
              </ListItem>
              <Box
                className="show"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    position: "fixed",
                    left: storedLanguage === "ar" ? "unset" : "163px",
                    right: storedLanguage === "ar" ? "172px" : "unset",
                  },
                  [theme.breakpoints.up("sm")]: {
                    position: "fixed",
                    left: storedLanguage === "ar" ? "unset" : "285px",
                    right: storedLanguage === "ar" ? "307px" : "unset",
                  },
                  [theme.breakpoints.up("md")]: {
                    bottom: index === 0 ? "-118%" : index === 1 ? "4%" : "50%",
                    transform: "translateX(-50%)",
                    position: "absolute",
                    minWidth: "140px",
                    left: storedLanguage === "ar" ? "-110px" : "405px",
                    right: storedLanguage === "ar" ? "unset" : "unset",
                  },
                  zIndex: 3,
                  display: "none",
                }}
              >
                <Paper>
                  <MenuList>
                    {category.items.slice(3).map((item) => (
                      <MenuItem
                        key={item.id}
                        onClick={() => handleMenuItemClick(item)}
                        sx={{
                          ":hover": { backgroundColor: "transparent" },
                          [theme.breakpoints.down("sm")]: {
                            p: "0px",
                          },
                        }}
                      >
                        <ListItem
                          component="a"
                          sx={{
                            color: "#000",
                            textAlign: "justify",
                            gap: 1,
                            ":hover": {
                              color: theme.palette.text.orange,
                              transition: "ease-in-out 0.2s",
                            },
                            ":not(:last-child)": {
                              borderBottom: "1px solid #0000000d",
                            },
                          }}
                        >
                          {item.icon}
                          <ListItemText
                            sx={{
                              [theme.breakpoints.down("sm")]: {
                                ".css-10hburv-MuiTypography-root": {
                                  fontSize: "0.8rem",
                                },
                              },
                            }}
                            primary={t(
                              `header3.menuItemsCategories.${item.title}`
                            )}
                          />
                        </ListItem>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </Box>
            </MenuItem>
          )}
        </>
      ))}
    </>
  );
}
