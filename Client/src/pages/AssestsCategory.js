import React from "react";
import { Box, Button, Link } from "@mui/material";
import men from "../assets/men.jpg";
import women from "../assets/women.jpg";

export default function AssetsCategory() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      <Box
        display="flex"
        width="100%"
        flexWrap="wrap"
        maxWidth="1200px"
      >
        <Box position="relative" width="100%" maxWidth="50%" >
          <img
            src={men}
            alt="Men"
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor:'#000',
              fontWeight:700,
              fontSize:'2.5rem',
              letterSpacing:'0.1rem'
            }}
          >
            <Link
              href="/categoryPage?category=men"
              color="inherit"
            >
              men
            </Link>
          </Button>
        </Box>
        <Box position="relative" width="100%" maxWidth="50%" >
          <img
            src={women}
            alt="Women"
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor:'#000',
              fontWeight:700,
              fontSize:'2.5rem',
              letterSpacing:'0.1rem'
            }}
          >
            <Link
              href="/categoryPage?category=women"
              color="inherit"
            >
              women
            </Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
