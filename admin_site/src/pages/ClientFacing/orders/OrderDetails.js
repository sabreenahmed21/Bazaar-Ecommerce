import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../../../services/Jsonserverapi";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function OrderDetails() {
  const { orderId } = useParams();
  const { data, isLoading, isError, error } = useGetSingleOrderQuery(orderId);
  const order = data?.order;
  console.log(order);

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Error fetching data {error?.data.message}
      </Box>
    );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day} `;
  };

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.1rem", sm: "2.1rem", md: "3rem" },
          }}
        >
          Order #{order._id}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            bgcolor: "#8080802e",
            p: 1,
            border: "none",
            borderRadius: 2,
            width: "fit-content",
            my: 1,
          }}
        >
          {order.orderStatus === "Delivered" ? (
            <span style={{ fontWeight: "bold" }}>Delivered At: </span>
          ) : (
            "processing"
          )}
          {order.orderStatus === "Delivered" && formatDate(order.deliveredAt)}
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container spacing={2} gap={2} m={0}>
          <Grid xs={12} sm={7.25}>
            <Box sx={{ bgcolor: "#8080802e", p: 1 }}>
              <Typography
                variant="h5"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                customer
              </Typography>
              <Box paddingLeft={2}>
                <Typography variant="body2">
                  {" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    name:
                  </span>{" "}
                  {order.user.name}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    email:
                  </span>{" "}
                  {order.user.email}
                </Typography>
                <Typography variant="body2">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    Address:
                  </span>{" "}
                  {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                  {order.shippingInfo.state}, {order.shippingInfo.country}
                </Typography>
                <Typography variant="body2">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    Phone Number:
                  </span>{" "}
                  {order.shippingInfo.phoneNo}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={4.35} md={4.5} lg={4.55}>
            <Box sx={{ bgcolor: "#8080802e", p: 1 }}>
              <Typography
                variant="h5"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                payment
              </Typography>
              <Box paddingLeft={2}>
                <Typography variant="body2">
                  {" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    status:
                  </span>{" "}
                  {order.paymentInfo.status}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    method:
                  </span>{" "}
                  visa card
                </Typography>
                <Typography variant="body2">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    paid on:
                  </span>{" "}
                  {formatDate(order.paidAt)}
                </Typography>
                <Typography variant="body2">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    total Price:
                  </span>{" "}
                  {order.totalPrice.toFixed(2)} L.E
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ bgcolor: "#8080802e", p: 1 }}>
              <Typography
                variant="h5"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                Order Items
              </Typography>
              <Box paddingLeft={2}>
                <TableContainer sx={{ border: "1px solid #000", my: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>img</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Qty.</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.orderItems.map((o, index) => (
                        <TableRow
                          key={index}
                          style={{
                            borderBottom:
                              index === order.orderItems.length - 1
                                ? "2px solid #000"
                                : "none",
                          }}
                        >
                          <TableCell><img src={o.images[0].url} alt={o.title} width={'60px'}/></TableCell>
                          <TableCell>{o.title}</TableCell>
                          <TableCell>{o.selectedSize}</TableCell>
                          <TableCell>{o.priceAfterDiscount} L.E</TableCell>
                          <TableCell>{o.quantity}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>
                          Total Quantity:
                        </TableCell>
                        <TableCell>{order.totalQuantity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                          Items Price:
                        </TableCell>
                        <TableCell colSpan={3}>
                          {order.itemsPrice.toFixed(2)} L.E
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                          Tax Price:
                        </TableCell>
                        <TableCell colSpan={3}>
                          {order.taxPrice.toFixed(2)} L.E
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                          Shipping Price:
                        </TableCell>
                        <TableCell colSpan={3}>
                          {order.shippingPrice.toFixed(2)} L.E
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                          Total Price:
                        </TableCell>
                        <TableCell colSpan={3}>
                          {order.totalPrice.toFixed(2)} L.E
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
