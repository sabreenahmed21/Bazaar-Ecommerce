import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
import Product from "../models/productModel.js";
import apiFeatures from "../utils/apiFeatures.js";
import { cloudinaryUploadImage } from "../utils/cloudinary.js";
import localizeProduct from "../utils/localizeProduct .js";

// -- Admin
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

//-- Admin
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

// -- Admin
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
  const localizedProducts = products.map((product) =>
    localizeProduct(product, lang)
  );
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    products: localizedProducts,
    resultPerPage,
    totalProductsCount,
  });
});

export const getProductDetails = asyncWrapper(async (req, res, next) => {
  const lang = req.query.lang || "en";
  const product = await Product.findById(req.params.id).populate("reviews");
  if (!product) {
    return next(new appError("No product found", 404, httpStatusText.ERROR));
  }
  const localizedProducts = localizeProduct(product, lang);
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    product: localizedProducts,
  });
});

export const discountedProducts = asyncWrapper(async (req, res, next) => {
  const lang = req.query.lang || "en";
  const query = Product.find({
    discountPercentage: { $gt: 0 },
  });
  const discountedProducts = await query;
  if (!discountedProducts || discountedProducts.length === 0) {
    return next(new appError("No discounted products found", 404));
  }
  const localizedProducts = discountedProducts.map((product) =>
    localizeProduct(product, lang)
  );
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    products: localizedProducts,
  });
});

export const getSimilarProductsBySubcategory = asyncWrapper(
  async (req, res, next) => {
    const { productId, category, subcategory } = req.params;
    const lang = req.query.lang || "en";
    const product = await Product.findById(productId);
    if (!product) {
      return next(new appError("Product Not Found", 404, httpStatusText.ERROR));
    }
    const similarProducts = await Product.find({
      category: category,
      subcategory: subcategory,
      _id: { $ne: productId },
    }).limit(8);
    const localizedProducts = similarProducts.map((product) =>
      localizeProduct(product, lang)
    );
    res.status(200).json({
      state: httpStatusText.SUCCESS,
      products: localizedProducts,
    });
  }
);
