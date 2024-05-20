import React, { useRef, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../Redux/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCreditCard, FaRegCalendarAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../Redux/OrderSlice";
import { useProcessPaymentMutation } from "../../../services/Jsonserverapi";

export default function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const accessToken = currentUser?.token;
  const { shippingInfo, items } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [processPayment] = useProcessPaymentMutation();

  const paymentData = {
    amount: Math.round(orderInfo.totalOrderPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: items,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalOrderPrice,
    taxPrice: orderInfo.GST,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setLoading(true);
    payBtn.current.disabled = true;

    try {
      const { data } = await processPayment(paymentData).unwrap();
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: currentUser.data.user.name,
            email: currentUser.data.user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message, {
          autoClose: 3000,
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment Successful", {
            autoClose: 3000,
          });
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder({ accessToken, order }));
          navigate("/thank-you");
        } else {
          toast.error("Payment Failed", {
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      toast.error(
        "Payment processing error. Please try again.",
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setLoading(false);
      setIsSubmitting(false);
      payBtn.current.disabled = false;
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <CheckoutSteps activeStep={2} />
      <Box
        sx={{
          maxWidth: "500px",
          margin: "40px auto",
          padding: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textTransform: "capitalize",
            direction: i18n.language === "ar" ? "rtl" : "ltr",
          }}
        >
          {t("payment.cardInformation")}
        </Typography>
        <form onSubmit={submitHandler}>
          <Box
            mb={2}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
            }}
          >
            <FaRegCreditCard size={24} style={{ marginRight: "10px" }} />
            <Box sx={{ flex: 1 }}>
              <CardNumberElement options={cardStyle} />
            </Box>
          </Box>
          <Box
            mb={2}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
            }}
          >
            <FaRegCalendarAlt size={24} style={{ marginRight: "10px" }} />
            <Box sx={{ flex: 1 }}>
              <CardExpiryElement options={cardStyle} />
            </Box>
          </Box>
          <Box
            mb={2}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
            }}
          >
            <FaLock size={24} style={{ marginRight: "10px" }} />
            <Box sx={{ flex: 1 }}>
              <CardCvcElement options={cardStyle} />
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            ref={payBtn}
            disabled={loading}
            fullWidth
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              `${t("payment.pay")} - ${
                orderInfo && orderInfo.totalOrderPrice
              } ${t("products.EGP")}`
            )}
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </>
  );
}
