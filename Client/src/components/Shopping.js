import React from "react";
import shopping from "../assets/1105891_1080p_Bags_Shopper_1280x720.mp4";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Shopping() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          mx: "auto",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          playsInline
        >
          <source src={shopping} type="video/mp4" />
        </video>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" textAlign="center" fontSize={"1.5rem"}>
            {t("shopping.parag")}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
