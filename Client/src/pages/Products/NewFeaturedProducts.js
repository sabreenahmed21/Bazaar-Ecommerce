import { Box, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import FeaturedProducts from "./FeaturedProducts";
import NewProducts from "./NewProducts";

export default function NewFeaturedProducts() {
  const isLargeScreen = useMediaQuery("(min-width:900px)");

  const { i18n } = useTranslation();
  const storedLanguage = i18n.language;
  return (
    <Box
      sx={{
        display: isLargeScreen? "grid" : "block",
        gridTemplateColumns: isLargeScreen? "1fr 2.5fr" : "none",
        alignItems: "center",
        justifyContent: "center",
        pb: 3,
        gap: 2,
        direction: storedLanguage === "ar"? "rtl" : "ltr",
      }}
    >
      <FeaturedProducts />
      <NewProducts />
    </Box>
  );
}
