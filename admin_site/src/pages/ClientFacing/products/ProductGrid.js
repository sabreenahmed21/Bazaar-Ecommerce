import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import React from "react";

export default function ProductGrid({ item, id }) {
  const theme = useTheme();
  return (
    <>
      <Card
        sx={{
          height: 255,
          ":hover .favorite-icon": {
            display: "block",
            transition: "0.35s ease",
          },
        }}
        key={id}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: 170,
            ":hover img": { transform: "scale(1.1)", transition: "0.35s" },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: "100%",
              backgroundSize: "contain",
              objectFit: "contain",
              transition: "transform 0.35s ease",
            }}
            title={item.title}
            image={item.images[0].url}
          />
          
        </Box>
        <CardContent sx={{ p: "16px" }}>
          <Stack alignItems={"center"} justifyContent={"space-between"}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: "0.8rem",
                lineHeight:1.6,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                height: "43px",
                textAlign: "-webkit-auto",
                mb: 0,
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "223px",
                },
              }}
            >
              {item.title}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent:'space-between',
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.5,
                  fontSize: "0.99rem",
                  fontFamily: '"Roboto Condensed", sans-serif',
                }}
              >
                {item.priceAfterDiscount} LE
              </Typography>
              {item.discountPercentage !== null &&
              item.discountPercentage !== 0 ? (
                <Typography
                  variant="subtitle1"
                  component="del"
                  sx={{
                    fontWeight: 500,
                    lineHeight: 1.5,
                    fontSize: "0.8rem",
                    color: theme.palette.grey[400],
                  }}
                >
                  {item.originalPrice} LE
                </Typography>
              ) : (
                " "
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
