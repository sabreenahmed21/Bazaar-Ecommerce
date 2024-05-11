import { Box } from "@mui/material";
import React from "react";
import defacto from "../../assets/Defacto.png";
import adidas from "../../assets/adidas.png";
import Active from "../../assets/Active.png";
import Puma from "../../assets/Puma.png";
import Ricci from "../../assets/Ricci.png";
import Nike from "../../assets/Nike.png";

export default function Brands() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        my: 3,
        p: 2,
        display:'grid',
        gridTemplateColumns: {
          xs: "repeat(2,1fr)",
          sm: "repeat(3,1fr)",
          md: "repeat(6,1fr)"
        },
        gap: 3,
      }}
    >
      <img src={adidas} alt="adidas" className="brand"/>
      <img src={Nike} alt="Nike" className="brand"/>
      <img src={Puma} alt="Puma" className="brand"/>
      <img src={defacto} alt="defacto" className="brand" />
      <img src={Active} alt="Active" className="brand"/>
      <img src={Ricci} alt="Ricci" className="brand"/>
    </Box>
  );
}
