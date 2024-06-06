import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetSingleOrderQuery } from "../services/Jsonserverapi";
import { PiPrinterBold } from "react-icons/pi";

const InvoicePrintPage = () => {
  const { orderId } = useParams();
  const { data, isLoading, isError, error } = useGetSingleOrderQuery(orderId);
  const order = data?.order;
  const navigate = useNavigate();

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

  const handlePrint = () => {
    const content = document.getElementById("invoice-content").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            @media print {
              body * {
                visibility: hidden;
              }
              #invoice-content, #invoice-content * {
                visibility: visible;
              }
            }
          </style>
        </head>
        <body>
          <div id="invoice-content">
            ${content}
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const currentDateTime = new Date().toLocaleString();

  const backtoOrders = () => {
    navigate("/orders");
  };

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

  return (
    <Container sx={{ mb: 2 }}>
      <Box p={2} id="invoice-content">
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, my: 2 }}>
          Bazaar store receipt
        </Typography>

        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>Date and Time:</span>{" "}
          {currentDateTime}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>Customer Name:</span>{" "}
          {order.user.name}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>Customer Phone No:</span>{" "}
          {order.shippingInfo.phoneNo}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
          {order.shippingInfo.address}, {order.shippingInfo.pincode},{" "}
          {order.shippingInfo.city}, {order.shippingInfo.state},{" "}
          {order.shippingInfo.country}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>Order ID:</span> {order._id}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>Payment Status:</span>{" "}
          {order.paymentInfo.status}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>Payment Date:</span>{" "}
          {formatDate(order.paidAt)}
        </Typography>
        <Typography variant="body1" color="initial">
          <span style={{ fontWeight: "bold" }}>Delivered At:</span>{" "}
          {formatDate(order.deliveredAt)}
        </Typography>

        <TableContainer sx={{ border: "1px solid #000", my: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
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

      <IconButton onClick={handlePrint} color="primary">
        <PiPrinterBold />
        <Typography variant="body2">Print</Typography>
      </IconButton>
      <Button
        onClick={backtoOrders}
        sx={{ textTransform: "capitalize", mx: 2 }}
        variant="outlined"
      >
        Back To Orders
      </Button>
    </Container>
  );
};

export default InvoicePrintPage;
