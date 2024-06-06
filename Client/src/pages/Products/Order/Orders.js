import React from "react";
import { useGetOrdersQuery } from "../../../services/Jsonserverapi.js";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Container,
} from "@mui/material";

const Orders = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery(null);
  console.log(orders);

  if (isLoading) {
    return (
      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"50vh"}
      >
        <span className="loader"></span>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error fetching orders: {error.message}
      </Typography>
    );
  }

  return (
    <Container>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 3,
          }}
        >
          Your Orders
        </Typography>
        {orders.orders.length === 0 ? (
          <Typography variant="body1">No orders found.</Typography>
        ) : (
          <List>
            {orders.orders.map((order) => (
              <Card
                key={order._id}
                variant="outlined"
                style={{ marginBottom: "20px" }}
              >
                <CardContent>
                  <Typography variant="subtitle1">
                    <strong>Order ID:</strong> {order._id}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Order Total Price:</strong> {order.totalPrice}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.paidAt).toLocaleDateString()}
                  </Typography>
                  <Divider style={{ margin: "10px 0" }} />
                  <Typography variant="h6">Items:</Typography>
                  <List>
                    {order.orderItems.map((item) => (
                      <ListItem
                        key={item._id}
                        alignItems="flex-start"
                        style={{ paddingBottom: "10px" }}
                      >
                        <ListItemText
                          primary={item.title}
                          secondary={
                            <>
                              <Typography variant="body2">
                                <strong>Brand:</strong> {item.brand}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Category:</strong> {item.category}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Description:</strong> {item.description}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Quantity:</strong> {item.quantity}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Size:</strong> {item.selectedSize}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Price After Discount:</strong> $
                                {item.priceAfterDiscount}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider style={{ margin: "10px 0" }} />
                  <Typography variant="h6" mb={2}>Shipping Info:</Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {order.shippingInfo.address}
                  </Typography>
                  <Typography variant="body2">
                    <strong>City:</strong> {order.shippingInfo.city}
                  </Typography>
                  <Typography variant="body2">
                    <strong>State:</strong> {order.shippingInfo.state}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Country:</strong> {order.shippingInfo.country}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Pincode:</strong> {order.shippingInfo.pincode}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone Number:</strong> {order.shippingInfo.phoneNo}
                  </Typography>
                  <Divider style={{ margin: "10px 0" }} />
                  <Typography variant="h6" mb={2}>Payment Info:</Typography>
                  <Typography variant="body2">
                    <strong>Payment ID:</strong> {order.paymentInfo.id}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {order.paymentInfo.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Shipping Price:</strong> ${order.shippingPrice}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tax Price:</strong> ${order.taxPrice}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default Orders;
