/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { selectCurrentUser, updateUserName } from "../../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, useTheme } from "@mui/material";

export default function UpdateUserData() {
  const currentUser = useSelector(selectCurrentUser);
  const accessToken = currentUser?.token;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSubmitForm = useCallback(async (formData) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/api/updateUserData`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Your date updated successfully!");
        dispatch(updateUserName(response.data.data.user.name));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  });
  const {
    register,
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  
  return (
    <Box width={'100%'} mt={5}>
      <ToastContainer />
      <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
        <Box>
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            margin="normal"
            id="name"
            {...register("name", {
              required: { value: true, message: "Username is required" },
            })}
          />
        </Box>
        <Button
          type="submit"
          disabled={loading}
          sx={{
            mt: "15px",
            color: theme.palette.text.main,
            backgroundColor: theme.palette.grey[100],
            fontWeight: 600,
          }}
        >
          {loading ? "Updating..." : "Update your username"}
        </Button>
      </form>
    </Box>
  );
}