import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
import Product from "../models/productModel.js";
import apiFeatures from "../utils/apiFeatures.js";
import { cloudinaryUploadImage } from "../utils/cloudinary.js";

//create product -- Admin
export const createProduct = asyncWrapper(async (req, res, next) => {
  // if (!req.user || !req.user.id) {
  //   return next(new Error("Authentication error: No user id found."));
  // }
  // req.body.user = req.user.id;

  if (req.files && req.files.length > 0) {
    const imageUploadPromises = req.files.map((file) =>
      cloudinaryUploadImage(file.path)
    );
    const images = await Promise.all(imageUploadPromises);
    console.log(images);
    req.body.images = images.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
  }

  const product = await Product.create(req.body);
  res.status(201).json({
    state: httpStatusText.SUCCESS,
    product,
  });
});

// getAllProducts
export const getAllProducts = asyncWrapper(async (req, res, next) => {
  const lang = req.query.lang || "en";
  const resultPerPage = 6;

  const countQuery = Product.find();
  const countFeatures = new apiFeatures(countQuery, req.query)
    .search()
    .filter()
    .sort()
    .limitFields();
  const totalProductsCount = await countFeatures.query.countDocuments();

  // Create a query for fetching paginated products
  const featuresForPagination = new apiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .limitFields();
  featuresForPagination.paginate(resultPerPage);

  const products = await featuresForPagination.query;
  if (!products || products.length === 0) {
    return next(new appError("No products found", 404));
  }

  const localizedProducts = products.map((product) => ({
    _id: product._id,
    title: product.title[lang] ?? "Title not available",
    description: product.description[lang] ?? "Description not available",
    originalPrice: product.originalPrice,
    discountPercentage: product.discountPercentage,
    priceAfterDiscount: product.priceAfterDiscount,
    rating: product.rating,
    images: product.images.map((img) => ({
      public_id: img._id,
      url: img.url,
    })),
    category: product.category,
    subcategory: product.subcategory,
    sizes: product.sizes,
    brand: product.brand,
    stock: product.stock,
    featured: product.featured,
    numOfReviews: product.numOfReviews,
    // reviews: product.reviews.map((review) => ({
    //   name: review.name,
    //   ratings: review.ratings,
    //   comment: review.comment[lang] ?? "Comment not available",
    //   id: review._id,
    // })),
    createdAt: product.createdAt,
  }));

  res.status(200).json({
    state: httpStatusText.SUCCESS,
    products: localizedProducts,
    resultPerPage,
    totalProductsCount,
  });
});

export const discountedProducts = asyncWrapper(async (req, res, next) => {
  const lang = req.query.lang || "en";  // Default to English if no language is specified

  // Query to find products with a discount greater than zero
  const query = Product.find({
    discountPercentage: { $gt: 0 }
  });

  const discountedProducts = await query;

  if (!discountedProducts || discountedProducts.length === 0) {
    return next(new appError("No discounted products found", 404));
  }

  // Localizing the product data based on the requested language
  const localizedProducts = discountedProducts.map((product) => ({
    _id: product._id,
    title: product.title[lang] ?? "Title not available",
    description: product.description[lang] ?? "Description not available",
    originalPrice: product.originalPrice,
    discountPercentage: product.discountPercentage,
    priceAfterDiscount: product.priceAfterDiscount,
    rating: product.rating,
    images: product.images.map((img) => ({
      public_id: img._id,
      url: img.url,
    })),
    category: product.category,
    subcategory: product.subcategory,
    sizes: product.sizes,
    brand: product.brand,
    stock: product.stock,
    featured: product.featured,
    numOfReviews: product.numOfReviews,
    // reviews: product.reviews.map((review) => ({
    //   name: review.name,
    //   ratings: review.ratings,
    //   comment: review.comment[lang] ?? "Comment not available",
    //   id: review._id,
    // })),
    createdAt: product.createdAt,
  }));

  res.status(200).json({
    state: httpStatusText.SUCCESS,
    products: localizedProducts,
  });
});


//getProductDetails
export const getProductDetails = asyncWrapper(async (req, res, next) => {
  const lang = req.query.lang || "en";
  const product = await Product.findById(req.params.id).populate('reviews');

  if (!product) {
    return next(new appError("No product found", 404, httpStatusText.ERROR));
  }
  // Localize the product information
  const localizedProduct = {
    _id: product._id,
    title: product.title[lang] ?? "Title not available",
    description: product.description[lang] ?? "Description not available",
    originalPrice: product.originalPrice,
    discountPercentage: product.discountPercentage,
    priceAfterDiscount: product.priceAfterDiscount,
    rating: product.rating,
    images: product.images.map((img) => ({
      public_id: img._id,
      url: img.url,
    })),
    category: product.category,
    subcategory: product.subcategory,
    sizes: product.sizes,
    brand: product.brand,
    stock: product.stock,
    featured: product.featured,
    numOfReviews: product.numOfReviews,
    reviews:  product.reviews,
    createdAt: product.createdAt,
  };

  res.status(200).json({
    state: httpStatusText.SUCCESS,
    product: localizedProduct,
  });
});

//update product -- Admin
export const updateProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new appError("No product found", 500, httpStatusText.ERROR));
  }
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    product,
  });
});

//delete product -- Admin
export const deleteProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new appError("No product found", 500, httpStatusText.ERROR));
  }
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    message: "Deleted Successfully",
  });
});
