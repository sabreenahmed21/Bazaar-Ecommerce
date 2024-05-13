import mongoose from "mongoose";

const { Schema } = mongoose;

const localizedTextSchema = new Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true },
});

const ProductSchema = new Schema({
  title: localizedTextSchema,
  description: localizedTextSchema,
  originalPrice: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  priceAfterDiscount: {
    type: Number,
  },
  rating: {
    type: Number,
    min: [0, "A product must have a rating value greater than or equal to 0"],
    max: [5, "A product must have a rating value less than or equal to 5"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: ["men", "women"],
  },
  subcategory: {
    type: String,
    required: [true, "Please enter product subcategory"],
  },
  sizes: {
    type: [String],
    required: [true, "Please enter product size(s)"],
  },
  brand: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    default: 1,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

ProductSchema.pre('save', function(next) {
  if (this.isModified('originalPrice') || this.isModified('discountPercentage')) {
    this.priceAfterDiscount = (this.originalPrice * (100 - this.discountPercentage)) / 100;
  }
  next();
});

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",  
});


export default mongoose.model("Product", ProductSchema);
