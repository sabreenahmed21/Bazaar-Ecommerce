import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import {
  useGetproductByNameQuery,
  useUpdateProductMutation,
} from "../../../services/Jsonserverapi";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

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

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => setValue(e.target.value);
  return [value, handleChange, setValue];
};

export default function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [titleEn, handleTitleEnChange, setTitleEn] = useInput("");
  const [titleAr, handleTitleArChange, setTitleAr] = useInput("");
  const [descriptionEn, handleDescriptionEnChange, setDescriptionEn] =
    useInput("");
  const [descriptionAr, handleDescriptionArChange, setDescriptionAr] =
    useInput("");
  const [category, handleCategoryChange, setCategory] = useInput("");
  const [stock, handleStockChange, setStock] = useInput("");
  const [originalPrice, handlePriceChange, setOriginalPrice] = useInput("");
  const [
    discountPercentage,
    handlediscountPercentageChange,
    setDiscountPercentage,
  ] = useInput("");
  const [featured, setFeatured] = useState(false);
  const [rating, handleRatingChange, setRating] = useInput(0);
  const [brand, setBrand] = useState("");
  const [sizes, handleSizeChange, setSizes] = useInput([]);
  const [images, setImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
    setImageFiles([...imageFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
  };

  const handleRemoveExistingImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleMoveImageUp = (index) => {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index - 1];
    newImages[index - 1] = temp;
    setImages(newImages);
    const newFiles = [...imageFiles];
    const tempFile = newFiles[index];
    newFiles[index] = newFiles[index - 1];
    newFiles[index - 1] = tempFile;
    setImageFiles(newFiles);
  };

  const handleMoveImageDown = (index) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index + 1];
    newImages[index + 1] = temp;
    setImages(newImages);
    const newFiles = [...imageFiles];
    const tempFile = newFiles[index];
    newFiles[index] = newFiles[index + 1];
    newFiles[index + 1] = tempFile;
    setImageFiles(newFiles);
  };

  const { data, isLoading, isError, error } = useGetproductByNameQuery(
    `admin/product/${productId}`
  );

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (data?.product) {
      const product = data.product;
      setProduct(product);
      setTitleEn(product.title.en);
      setTitleAr(product.title.ar);
      setDescriptionEn(product.description.en);
      setDescriptionAr(product.description.ar);
      setCategory(product.category);
      setStock(product.stock);
      setOriginalPrice(product.originalPrice);
      setDiscountPercentage(product.discountPercentage);
      setFeatured(product.featured);
      setRating(product.rating);
      setBrand(product.brand);
      setSizes(product.sizes);
      setImages(product.images);
      setSubcategory(product.subcategory);
    }
  }, [
    data,
    setTitleEn,
    setTitleAr,
    setDescriptionEn,
    setDescriptionAr,
    setCategory,
    setStock,
    setOriginalPrice,
    setDiscountPercentage,
    setRating,
    setSizes,
  ]);

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
    images.forEach((image, index) => {
      if (image.file) {
        formData.append("newImages", image.file);
      } else {
        formData.append(`images[${index}][public_id]`, image.public_id);
        formData.append(`images[${index}][url]`, image.url);
      }
    });
    try {
      await updateProduct({ productId, formData }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Product updated successfully!",
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.pathname = `/product/${productId}`;
    } catch (error) {
      const message = error?.data?.message || "Failed to update product.";
      setSnackbar({ open: true, message });
    }
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Error fetching data {error?.data.message}
      </Box>
    );

  return (
    <>
      <Grid container justifyContent="center" my={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb={2}>
            Edit Product
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
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                {(imageFiles ? images : []).map((image, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={2}>
                    <img
                      src={image.url || image.preview}
                      alt={`Preview ${index + 1}`}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <IconButton
                      onClick={() =>
                        image.file
                          ? handleRemoveImage(index)
                          : handleRemoveExistingImage(index)
                      }
                    >
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                style={{ marginTop: "1rem" }}
              >
                {isUpdating ? <CircularProgress size={24} /> : "Update Product"}
              </Button>
            </form>
          </Paper>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ open: false, message: "" })}
            message={snackbar.message}
          />
        </Grid>
      </Grid>
    </>
  );
}
