const localizeProduct = (product, lang) => ({
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
  createdAt: product.createdAt,
});
export default localizeProduct ;