import {
  Box,
  Step,
  StepLabel,
  Stepper,
  useTheme,
  Typography,
} from "@mui/material";
import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function Checkout({ activeStep }) {
  const steps = [
    {
      label: "shippingDetails",
      icon: <MdLocalShipping fontSize={"xx-large"} />,
    },
    {
      label: "confirmOrder",
      icon: <MdLibraryAddCheck fontSize={"xx-large"} />,
    },
    {
      label: "payment",
      icon: <MdAccountBalance fontSize={"xx-large"} />,
    },
  ];

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ boxSizing: "border-box" }}
      >
        {steps.map((item, index) => (
          <Step key={index}>
            <StepLabel
              icon={item.icon}
              sx={{
                color:
                  activeStep >= index
                    ? theme.palette.text.yellow
                    : theme.palette.grey[700],
              }}
            >
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "1.3rem", fontWeight: 600, lineHeight:0 }}
              >
                {t(`payment.${item.label}`)}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
