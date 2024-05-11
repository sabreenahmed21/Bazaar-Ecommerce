// @ts-nocheck
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import Person from "./Person.js";
import { useTranslation } from "react-i18next";

export default function Header() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const languageOptions = [
    { labelKey: "english", value: "en" },
    { labelKey: "arabic", value: "ar" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(() => {
    const primaryLangCode = i18n.language.split('-')[0]; 
    const index = languageOptions.findIndex((option) => option.value === primaryLangCode);
    return index >= 0 ? index : 0; 
  });
  

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    handleClose();
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const storedLanguage = i18n.language;

  return (
    <Box
      sx={{
        bgcolor: theme.palette.secondary.main,
        color: "#fff",
        direction: storedLanguage === "ar" ? "rtl" : "ltr",
      }}
    >
      <Container>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            variant="body2"
            sx={{ [theme.breakpoints.down("sm")]: { display: "none" } }}
          >
            {t("header.title")}
          </Typography>
          <Box flexGrow={1} />
          <Box>
            <List
              component="nav"
              aria-label="Device settings"
              sx={{ p: 0, m: 0 }}
            >
              <ListItem
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickListItem}
                sx={{ "&:hover": { cursor: "pointer" }, px: 1 }}
              >
                <ListItemText
                  sx={{ ".MuiTypography-root": { color: "#fff" } }}
                  secondary={t(
                    `header.languages.${languageOptions[selectedIndex].labelKey}`
                  )}
                />
                <MdArrowDropDown sx={{ fontSize: "16px" }} />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {languageOptions.map((option, index) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === i18n.language}
                  onClick={(event) => {
                    handleLanguageChange(option.value);
                    handleMenuItemClick(event, index);
                  }}
                >
                  {t(`header.languages.${option.labelKey}`)}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Person />
        </Stack>
      </Container>
    </Box>
  );
}
