import Order from "../models/orderModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
import Product from "../models/productModel.js";

//create new order
export const createOrder = asyncWrapper(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    order,
  });
});

//get one order
export const getSingleOrder = asyncWrapper(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new appError("Order not found with this id", 404));
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    order,
  });
});

//get users orders
export const myOrders = asyncWrapper(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    orders,
  });
});

//get all orders --Admin
export const getAllOrders = asyncWrapper(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    numberOfItems: orders.length,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    orders,
  });
});

//update orders --Admin
export const updateOrders = asyncWrapper(async (req, res, next) => {
  const order = await Order.find(req.params.id);
  if(!order){
    return next(new appError("Order not found with this id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new appError("You have already delivered this order", 400));
  }
  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });
  order.orderStatus = req.body.status;
  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = Product.findById(id);
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//delete order --Admin
export const deleteOrder = asyncWrapper(async (req, res, next) => {
  const deletedOrder = await Order.find(req.params.id);
  if(!deletedOrder){
    return next(new appError("Order not found with this id", 404));
  }
  await deleteOrder.remove();
  res.status(204).json({
    status: httpStatusText.SUCCESS
})
});

