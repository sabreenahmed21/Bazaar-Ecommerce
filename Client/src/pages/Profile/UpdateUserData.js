import React, { useState } from "react";
import { updateUserName } from "../../Redux/UserSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { useUpdateUserDataMutation } from "../../services/Jsonserverapi";

export default function UpdateUserData() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [updateUserData] = useUpdateUserDataMutation();
  const { register, handleSubmit } = useForm({ mode: "onBlur" });

  const handleSubmitForm = async (formData) => {
    setLoading(true);
    try {
      const response = await updateUserData(formData).unwrap();
      if (response) {
        toast.success("Your data updated successfully!");
        dispatch(updateUserName(response.data.user.name));
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width={"100%"}>
      <ToastContainer />
      <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
        <Box
          sx={{
            gap: 2,
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Box>
            <TextField
              type="text"
              label="Username"
              variant="outlined"
              margin="normal"
              id="name"
              sx={{ m: 0 }}
              {...register("name", {
                required: { value: true, message: "Username is required" },
              })}
            />
          </Box>
          <Button
            type="submit"
            variant="outlined"
            disabled={loading}
            sx={{
              fontWeight: 600,
              height: "3.4rem",
              color: theme.palette.text.main,
              backgroundColor: theme.palette.grey[100],
            }}
          >
            {loading ? "Updating..." : "Update your username"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
