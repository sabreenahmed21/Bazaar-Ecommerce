import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../../Redux/CartSlice";
import CheckoutSteps from "./CheckoutSteps";
import "../Product.css";
import { useTranslation } from "react-i18next";

export default function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { shippingInfo } = useSelector((state) => state.cart);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      address: shippingInfo?.address ?? "",
      city: shippingInfo?.city ?? "",
      state: shippingInfo?.state ?? "",
      country: shippingInfo?.country ?? "",
      pincode: shippingInfo?.pincode ?? "",
      phoneNo: shippingInfo?.phoneNo ?? "",
    },
  });

  const selectedCountry = watch("country");

  const onSubmit = (data) => {
    dispatch(saveShippingInfo(data));
    navigate("/confirm-order");
  };

  return (
    <>
      <CheckoutSteps activeStep={0} />
      <Container>
        <Box sx={{ bgcolor: "#fff", my: 4, p: 2 }}>
          <Typography
            variant="h2"
            color="initial"
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: "2rem",
              direction: i18n.language === "ar" ? "rtl" : "ltr",
            }}
          >
            {t("payment.shippingDetails")}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <TextField
                {...register("address", { required: true })}
                type="text"
                variant="outlined"
                placeholder="Address"
                error={!!errors.address}
                helperText={errors.address && "Address is required"}
              />
              <TextField
                {...register("city", { required: true })}
                type="text"
                variant="outlined"
                placeholder="City"
                error={!!errors.city}
                helperText={errors.city && "City is required"}
              />
              <TextField
                {...register("pincode", { required: true })}
                type="number"
                variant="outlined"
                placeholder="Pin Code"
                error={!!errors.pincode}
                helperText={errors.pincode && "Pin Code is required"}
              />
              <TextField
                {...register("phoneNo", { required: true })}
                type="number"
                variant="outlined"
                placeholder="Phone Number"
                error={!!errors.phoneNo}
                helperText={errors.phoneNo && "Phone Number is required"}
              />
              <select
                {...register("country", { required: true })}
                className="select"
              >
                <option value={""}>Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {selectedCountry && (
                <select
                  {...register("state", { required: true })}
                  className="select"
                >
                  <option value={""}>State</option>
                  {State &&
                    State.getStatesOfCountry(selectedCountry).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              )}
              <Button type="submit" variant="contained" color="primary">
                {t("login&signup.continue")}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
