import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { secondary } from "../Colors";

export default function Dashboard() {
  return (
    <Container>
      <Box>
        <Typography
          variant="h4"
          sx={{
            color: secondary[800],
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          dashboard
        </Typography>
        <Typography variant="h5" color={secondary[600]}>
          welcome to your dashboard
        </Typography>
      </Box>
    </Container>
  );
}
