import {
  Box,
  Stack,
  Typography,
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useGetproductByNameQuery } from "../../services/Jsonserverapi.js";
import { Link } from "react-router-dom";
import LoadingProductCard from "./LoadingProductCard.js";
import { useTranslation } from "react-i18next";
import ProductGrid from "./ProductGrid.js";
import { motion } from "framer-motion";

export default function Products() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [currentQuery, setCurrentQuery] = useState(
    `products?lang=${i18n.language}`
  );
  useEffect(() => {
    setCurrentQuery(`products?lang=${i18n.language}`);
  }, [i18n.language]);

  const handleValueChange = useCallback(
    (event, newValue) => {
      if (newValue) {
        setCurrentQuery(newValue);
      }
    },
    [setCurrentQuery]
  );

  const { data, isLoading, isError, error } =
    useGetproductByNameQuery(currentQuery);
  const categories = [
    { title: "allProducts", queryParam: "" },
    { title: "menCategory", queryParam: "&category=men" },
    { title: "womenCategory", queryParam: "&category=women" },
  ].map((category) => ({
    ...category,
    value: `products?lang=${i18n.language}${category.queryParam}`,
    aria: `${category.title} button`,
  }));

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        gap: 1.5,
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <HeaderComponent theme={theme} t={t} />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ToggleButtonGroup
            value={currentQuery}
            exclusive
            onChange={handleValueChange}
            aria-label="Product Category"
            sx={{ gap: 1 }}
          >
            {categories.map((item) => (
              <ToggleButton
                key={item.title}
                value={item.value}
                aria-label={item.aria}
                sx={toggleButtonStyles}
              >
                {t(`products.${item.title}`)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </motion.div>
      </Stack>
      {isLoading ? (
        <LoadingProductCard count={8} />
      ) : isError ? (
        <Typography
          variant="body1"
          color="error"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            my: 2,
          }}
        >
          {error?.message || t("errorLoadingProducts")}
        </Typography>
      ) : !data || data.products.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ mt: 2, textAlign: "center", fontWeight: 400 }}
        >
          {t("noProductsFound")}
        </Typography>
      ) : (
        <ProductList data={data} />
      )}
    </Box>
  );
}

function HeaderComponent({ theme, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Typography
          variant="h3"
          sx={{
            textTransform: "uppercase",
            fontSize: "1.09rem",
            fontWeight: 600,
            letterSpacing: "0.02rem",
          }}
        >
          {t("products.selectedProducts")}
        </Typography>
        <Link
          to={"/products"}
          style={{
            textDecoration: " underline",
            margin: "20px 0",
            color: theme.palette.text.red,
            fontWeight: 600,
          }}
        >
          {t("home.ViewAllProducts")}
        </Link>
      </Box>
      <Typography
        variant="body1"
        sx={{ fontWeight: 300, textTransform: "capitalize" }}
      >
        {t("products.brandSelection")}
      </Typography>
    </motion.div>
  );
}

function ProductList({ data }) {
  return (
    <Stack
      mt={4}
      direction="row"
      justifyContent={{ xs: "center", sm: "left" }}
      alignItems="center"
      flexWrap="wrap"
      gap={3}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
      }}
    >
      {data.products.map((item, id) => (
        <Link
          key={item._id}
          to={`/product/${item._id}`}
          style={{ textDecoration: "none" }}
        >
          <ProductGrid item={item} id={id} />
        </Link>
      ))}
    </Stack>
  );
}

const toggleButtonStyles = {
  color: "#000",
  textTransform: "capitalize",
  fontWeight: 500,
  fontSize: { xs: "11px", sm: "16px" },
  letterSpacing: { xs: "1.1px", sm: "0.2px" },
  border:0,
  "&.Mui-selected": {
    borderBottom: '4px solid #000',
    backgroundColor: 'transparent',
    fontWeight:700
  },
};
