import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Divider, Button, Container } from "@mui/material";
import { selectCurrentUser } from "../../../Redux/UserSlice";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ConfirmOrder() {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { shippingInfo, items } = useSelector((state) => state.cart);
  const address = shippingInfo
    ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`
    : "";

  const subtotal = items.reduce(
    (acc, item) => acc + item.priceAfterDiscount * item.quantity,
    0
  );
  const shippingCharges = 50;
  const GST = subtotal * 0.05;
  const totalOrderPrice = subtotal + shippingCharges + GST;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      GST,
      totalOrderPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps activeStep={1} />
      <Container>
        <Box
          sx={{
            padding: 2,
            bgcolor: "#fff",
            my: 4,
            direction: i18n.language === "ar" ? "rtl" : "ltr",
          }}
        >
          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: "2rem",
                textTransform: "capitalize",
              }}
            >
              {t("payment.shippingInfo")}
            </Typography>
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="body1">
                <strong>{t("payment.name")}:</strong>{" "}
                {currentUser?.data?.user?.name}
              </Typography>
              <Typography variant="body1">
                <strong>{t("payment.phone")}:</strong> {shippingInfo.phoneNo}
              </Typography>
              <Typography variant="body1">
                <strong>{t("payment.address")}:</strong> {address}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "2rem" }}>
              {t("payment.orderItems")}
            </Typography>
            {items.map((item) => (
              <Box
                key={item.product}
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Box sx={{ marginRight: 2 }}>
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="body1">
                    {t("payment.quantity")}: {item.quantity}
                  </Typography>
                  <Typography variant="body1">
                    {t("payment.size")}: {item.selectedSize}
                  </Typography>
                  <Typography variant="body1">
                    {t("payment.pricePerUnit")}: {item.priceAfterDiscount}{" "}
                    {t("products.EGP")}
                  </Typography>
                  <Typography variant="body1">
                    {t("payment.totalPrice")}:{" "}
                    {item.priceAfterDiscount * item.quantity}{" "}
                    {t("products.EGP")}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "2rem" }}>
              {t("payment.orderSummary")}:
            </Typography>
            <Typography variant="body1">
              <strong>{t("payment.Subtotal")}:</strong> {subtotal.toFixed(2)}{" "}
              {t("products.EGP")}
            </Typography>
            <Typography variant="body1">
              <strong>{t("payment.shippingCharges")}:</strong>{" "}
              {shippingCharges.toFixed(2)} {t("products.EGP")}
            </Typography>
            <Typography variant="body1">
              <strong>{t("payment.GST")}: (5%):</strong> {GST.toFixed(2)}{" "}
              {t("products.EGP")}
            </Typography>
            <Divider sx={{ marginY: 1 }} />
            <Typography variant="body1">
              <strong>{t("payment.totalPrice")}:</strong>{" "}
              {totalOrderPrice.toFixed(2)} {t("products.EGP")}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={proceedToPayment}
          >
            {t("payment.proceedToPayment")}
          </Button>
        </Box>
      </Container>
    </>
  );
}
