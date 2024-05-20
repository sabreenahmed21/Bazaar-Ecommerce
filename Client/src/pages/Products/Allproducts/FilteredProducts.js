import { useTranslation } from "react-i18next";

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
  useTheme,
  Radio,
  Button,
} from "@mui/material";

import {
  availableBrands,
  availableSizes,
  ratingOptions,
  discountOptions,
} from "./Available.js";

export default function FilteredProducts({
  selectedBrands,
  handleBrandChange,
  selectedSizes,
  handleSizeChange,
  price,
  setPrice,
  selectedDiscount,
  setSelectedDiscount,
  rating,
  setRating,
  resetFilters,
}) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: "#fff", px: 1 }}>
      <FormGroup sx={{ borderBottom: "2px solid #0000002e", pb: 3, pt:2 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.main,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
          }}
        >
          {t("productsFilter.brandFilter")}
        </Typography>
        {availableBrands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={handleBrandChange}
                value={brand}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>
      <FormGroup sx={{ borderBottom: "2px solid #0000002e", py: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.main,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
          }}
        >
          {t("productsFilter.sizeFilter")}
        </Typography>
        {availableSizes.map((size) => (
          <FormControlLabel
            key={size}
            control={
              <Checkbox
                checked={selectedSizes.includes(size)}
                onChange={handleSizeChange}
                value={size}
              />
            }
            label={size}
          />
        ))}
      </FormGroup>
      <Box sx={{ borderBottom: "2px solid #0000002e", py: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.main,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
            mb: 1,
          }}
        >
          {t("productsFilter.priceFilter")}
        </Typography>
        <Slider
          getAriaLabel={() => "price range"}
          value={price}
          onChange={(e, priceRange) => setPrice(priceRange)}
          valueLabelDisplay="auto"
          min={0}
          max={3000}
          step={50}
          sx={{
            ".MuiSlider-thumb": { borderRadius: "0", width: "5px" },
          }}
        />
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Typography variant="body2" color="initial">0 {t("products.EGP")}</Typography>
          <Typography variant="body2" color="initial">3000 {t("products.EGP")}</Typography>
        </Box>
      </Box>
      <FormGroup sx={{ borderBottom: "2px solid #0000002e", py: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.main,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
          }}
        >
          {t("productsFilter.discount")}
        </Typography>
        {discountOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Radio
                checked={selectedDiscount === option.value}
                onChange={() => setSelectedDiscount(option.value)}
                value={option.value}
              />
            }
            label={t(`productsFilter.${option.label}`)}
          />
        ))}
      </FormGroup>
      <FormGroup sx={{ borderBottom: "2px solid #0000002e", py: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.main,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
          }}
        >
          {t("productsFilter.rateFilter")}
        </Typography>
        {ratingOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Radio
                checked={rating === option.value}
                onChange={() => setRating(option.value)}
                value={option.value}
              />
            }
            label={t(`productsFilter.${option.label}`)}
          />
        ))}
      </FormGroup>
      <Button
        onClick={resetFilters}
        variant="outlined"
        color="secondary"
        sx={{ my: 3 }}
      >
        {t("productsFilter.resetFilters")}
      </Button>
    </Box>
  );
}
