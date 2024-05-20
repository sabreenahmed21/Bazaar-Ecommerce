import stripe from "../utils/stripe.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

export const createPaymentIntent = asyncWrapper(async (req, res, next) => {
  const { amount, currency } = req.body; 
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: currency || 'egp', 
    metadata: {
      company: "Ecommerce" 
    }
  });
  res.status(200).json({
    status: 'succeeded',
    client_secret: paymentIntent.client_secret
  });
});

export const sendStripeApikey = asyncWrapper( async (req, res, next) => {
  res.status(200).json({stripeapikey: process.env.STRIPE_API_KEY})
})