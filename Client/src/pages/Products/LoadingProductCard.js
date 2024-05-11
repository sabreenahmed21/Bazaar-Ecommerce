import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import React from "react";

const LoadingCard = () => {
  return (
    <Card
      sx={{
        maxWidth: { xs: 322 },
        minWidth: { xs: 255, sm: 264 },
        height: "415px",
      }}
    >
      <CardMedia
        sx={{
          height: 200,
          width: "100%",
        }}
        className="skeleton"
        image=""
      />
      <CardContent>
        <Stack alignItems={"center"} justifyContent={"space-between"} gap={3}>
          <Box className="skeleton" width={"40%"} height={"20px"}></Box>
          <Box className="skeleton" width={"70%"} height={"40px"}></Box>
          <Box
            className="skeleton"
            width={"50%"}
            height={"20px"}
            marginTop={"10px"}
          ></Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", p: 2 }}>
        <Box
          className="skeleton"
          height={"20px"}
          sx={{ width: "-webkit-fill-available" }}
        ></Box>
      </CardActions>
    </Card>
  );
};
export default function LoadingProductCard({ count }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <LoadingCard key={i} />
      ))}
    </Box>
  );
}
