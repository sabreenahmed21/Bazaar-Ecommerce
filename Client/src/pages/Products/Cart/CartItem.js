import React from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../../Redux/CartSlice";
import { TableCell, TableRow, Button } from "@mui/material";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(
      removeItemFromCart({ id: item._id, selectedSize: item.selectedSize })
    );
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <img
          src={item.images[0].url}
          alt={item.title}
          style={{ width: 70, height: 70 }}
        />
      </TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.selectedSize}</TableCell>
      <TableCell>{item.priceAfterDiscount}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>
        <Button variant="outlined" color="error" onClick={handleRemoveFromCart}>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default CartItem;
