/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  ListItemText,
  Checkbox,
  Box,
} from "@mui/material";
//import { useAddProductByAdminMutation } from "../services/Jsonserverapi";

const useInput = (
  initialValue,
  isCheckbox = false,
  isMultipleSelect = false
) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    const { target } = event;
    if (isCheckbox) {
      setValue(target.checked);
    } else if (isMultipleSelect && target.selectedOptions) {
      const valueArray = Array.from(
        target.selectedOptions,
        (option) => option.value
      );
      setValue(valueArray);
    } else {
      setValue(target.value);
    }
  };

  return [value, handleChange, setValue];
};

const AddProductForm = () => {
  const [titleEn, handleTitleEnChange] = useInput("");
  const [titleAr, handleTitleArChange] = useInput("");
  const [descriptionEn, handleDescriptionEnChange] = useInput("");
  const [descriptionAr, handleDescriptionArChange] = useInput("");
  const [category, handleCategoryChange] = useInput("");
  const [stock, handleStockChange] = useInput("");
  const [originalPrice, handlePriceChange] = useInput("");
  const [discountPercentage, handlediscountPercentageChange] = useInput("");
  const [featured, setFeatured] = useState(false);
  const [rating, handleRatingChange] = useInput(4.5);
  const [brand, setBrand] = useState("");
  const [sizes, handleSizeChange] = useInput([], false, true);
  const [images, setImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const availableSizes = ["Small", "Medium", "Large", "Extra Large"];
  const availableBrands = ['Nike', 'Adidas', 'Puma', 'Gucci', 'Versace', 'azeez', 'Ricci', 'Defacto', 'Active']

  useEffect(() => {
    switch (category) {
      case "men":
        setSubcategories([
          "Shirts",
          "TshirtsPolos",
          "JeansPants",
          "JacketsCoats",
          "Suits",
          "Sportswear",
          "Homewear",
          "Pullover",
          "Hoodies"
        ]);
        break;
      case "women":
        setSubcategories([
          "Dresses",
          "Skirts",
          "TopsBlouses",
          "Cardigans",
          "JeansPants",
          "JacketsCoats",
          "Suits",
          "Sportswear",
          "Homewear",
          "Pullover",
          "Hoodies",
        ]);
        break;
      default:
        setSubcategories([]);
    }
  }, [category]);

  //const [addProductByAdmin, { isLoading }] = useAddProductByAdminMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title[en]", titleEn);
    formData.append("title[ar]", titleAr);
    formData.append("description[en]", descriptionEn);
    formData.append("description[ar]", descriptionAr);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPercentage", discountPercentage);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("stock", stock);
    formData.append("featured", featured);
    formData.append("brand", brand);
    formData.append("rating", rating);
    sizes.forEach((size) => formData.append("sizes", size));
    images.forEach((image) => formData.append("images", image));

    try {
      //const res = await addProductByAdmin(formData).unwrap();
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/create_product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      setSnackbar({ open: true, message: "Product added successfully!" });
    } catch (error) {
      const message = error?.data?.message || "Failed to add product.";
      setSnackbar({ open: true, message });
    }
  };

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  return (
    <Grid container justifyContent="center" my={5}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" mb={2}>
          Add New Product
        </Typography>
        <Paper style={{ padding: 16 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="titleEn"
              label="Title (English)"
              fullWidth
              margin="normal"
              value={titleEn}
              onChange={handleTitleEnChange}
            />
            <TextField
              name="titleAr"
              label="Title (Arabic)"
              fullWidth
              margin="normal"
              value={titleAr}
              onChange={handleTitleArChange}
            />
            <TextField
              name="descriptionEn"
              label="Description (English)"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={descriptionEn}
              onChange={handleDescriptionEnChange}
            />
            <TextField
              name="descriptionAr"
              label="Description (Arabic)"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={descriptionAr}
              onChange={handleDescriptionArChange}
            />
            <TextField
              name="originalPrice"
              label="originalPrice"
              type="number"
              fullWidth
              margin="normal"
              value={originalPrice}
              onChange={handlePriceChange}
            />
            <TextField
              name="discountPercentage"
              label="discountPercentage"
              type="number"
              fullWidth
              margin="normal"
              value={discountPercentage}
              onChange={handlediscountPercentageChange}
            />
            <TextField
              name="rating"
              label="Rating"
              type="number"
              fullWidth
              margin="normal"
              value={rating}
              onChange={handleRatingChange}
              inputProps={{ min: 0, max: 5, step:0.1}}
            />
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={category}
              label="Category"
              fullWidth
              onChange={handleCategoryChange}
            >
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
            </Select>
            <InputLabel id="subcategory-label">Subcategory</InputLabel>
            <Select
              labelId="subcategory-label"
              name="subcategory"
              value={subcategory}
              label="Subcategory"
              fullWidth
              onChange={(e) => setSubcategory(e.target.value)}
            >
              {subcategories.map((sub) => (
                <MenuItem key={sub} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="size-label">Size</InputLabel>
            <Select
              labelId="size-label"
              name="sizes"
              multiple
              value={sizes}
              onChange={handleSizeChange}
              renderValue={(selected) => selected.join(", ")}
              fullWidth
            >
              {availableSizes.map((size) => (
                <MenuItem key={size} value={size}>
                  <Checkbox checked={sizes.indexOf(size) > -1} />
                  <ListItemText primary={size} />
                </MenuItem>
              ))}
            </Select>
            <TextField
              name="stock"
              label="Stock"
              type="number"
              fullWidth
              margin="normal"
              value={stock}
              onChange={handleStockChange}
            />
            <InputLabel id="brand-label">Brand</InputLabel>
            <Select
              labelId="brand-label"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              fullWidth
            >
              {availableBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
            <Box>
            <Checkbox
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              name="featured"
              id="featured"
            />
            <label htmlFor="featured">Featured Product</label>
            </Box>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload Images
              </Button>
            </label>
            {images.length > 0 && (
              <Typography variant="subtitle1" gutterBottom>
                {images.map((file) => file.name).join(", ")}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              //disabled={isLoading ? "disabled" : ""}
              style={{ marginTop: "1rem" }}
            >
              {/* {isLoading ? <CircularProgress size={24} /> : "Add Product"} */}
              Add Product
            </Button>
          </form>
        </Paper>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbar.message}
        />
      </Grid>
    </Grid>
  );
};

export default AddProductForm;
