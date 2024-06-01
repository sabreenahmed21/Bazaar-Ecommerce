import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import { useAddProductByAdminMutation } from "../../../services/Jsonserverapi";
import { MdDelete } from "react-icons/md";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";

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
  const [rating, handleRatingChange] = useInput(0);
  const [brand, setBrand] = useState("");
  const [sizes, handleSizeChange] = useInput([], false, true);
  const [images, setImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const availableSizes = ["Small", "Medium", "Large", "Extra Large"];
  const availableBrands = [
    "Nike",
    "Adidas",
    "Puma",
    "Gucci",
    "Versace",
    "azeez",
    "Ricci",
    "Defacto",
    "Active",
  ];

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
          "Hoodies",
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

  const [addProductByAdmin, { isLoading, data, error }] =
    useAddProductByAdminMutation();
  console.log(data, error);
console.log(images);
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
    images.forEach((image) => formData.append("images", image.file));


    try {
      const res = await addProductByAdmin(formData).unwrap();
      console.log(res);
      setSnackbar({ open: true, message: "Product added successfully!" });
    } catch (error) {
      const message = error?.data?.message || "Failed to add product.";
      setSnackbar({ open: true, message });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesWithPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...imagesWithPreview]);
  };
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleMoveImageUp = (index) => {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index - 1];
    newImages[index - 1] = temp;
    setImages(newImages);
  };

  const handleMoveImageDown = (index) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index + 1];
    newImages[index + 1] = temp;
    setImages(newImages);
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
              label="Original Price"
              type="number"
              fullWidth
              margin="normal"
              value={originalPrice}
              onChange={handlePriceChange}
            />
            <TextField
              name="discountPercentage"
              label="Discount Percentage"
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
              inputProps={{ min: 0, max: 5, step: 0.1 }}
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
              type="file"
              multiple
              onChange={handleImageChange}
              style={{ marginTop: 16 }}
            />
            <Box my={3} display="flex" flexDirection="column" gap={2}>
              {images.map((image, index) => (
                <Box key={index} display="flex" alignItems="center" gap={2}>
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                  <IconButton onClick={() => handleRemoveImage(index)}>
                  <MdDelete />
                  </IconButton>
                  <IconButton onClick={() => handleMoveImageUp(index)}>
                    <FaArrowCircleUp />
                  </IconButton>
                  <IconButton onClick={() => handleMoveImageDown(index)}>
                    <FaArrowCircleDown />
                  </IconButton>
                </Box>
              ))}
            </Box>
            {isLoading ? (
              <CircularProgress style={{ display: "block", margin: "16px auto" }} />
            ) : (
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Product
              </Button>
            )}
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Grid>
  );
};

export default AddProductForm;
