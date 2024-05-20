import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  stock: { type: Number, required: true },
  subcategory: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  selectedSize: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  featured: {
    type: Boolean,
    default: false,
  },
  originalPrice: { type: Number, required: true },
  rating: { type: Number, required: true },
  numOfReviews: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },
  orderItems: [orderItemSchema],
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  paymentInfo: {
    id: { type: String, required: true },
    status: { type: String, required: true },
  },
  paidAt: { type: Date, required: true },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Order", orderSchema);
