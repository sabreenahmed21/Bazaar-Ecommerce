import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../services/Jsonserverapi";
import { selectCurrentAdmin, updatePassword } from "../redux/AdminSlice";

export default function UpdatePassword() {
  const CurrentAdmin = useSelector(selectCurrentAdmin);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const [updatePasswordMutation] = useUpdatePasswordMutation();

  const onSubmit = async (data) => {
    try {
      const response = await updatePasswordMutation({
        ...data,
        accessToken: CurrentAdmin?.token,
      }).unwrap();
      console.log(response);
      dispatch(updatePassword(response?.data?.user?.password));
      Swal.fire({
        icon: "success",
        title: "Your password has been updated successfully",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "#fff", mt: 4 }}>
      <Box pt="50px" pb="50px">
        <Box textAlign={"center"} mb={3}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "700",
              fontSize: "1.75rem",
              lineHeight: "1",
              letterSpacing: "0.006em",
              textTransform: "capitalize",
            }}
          >
            updateyourpassword
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              label="Current Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("passwordCurrent", {
                required: "Current password is required",
              })}
            />
            <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
              {errors.passwordCurrent?.message}
            </Typography>
          </Box>

          <Box>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
              {errors.password?.message}
            </Typography>
          </Box>

          <Box>
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("passwordConfirm", {
                required: "Please confirm new password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
              {errors.passwordConfirm?.message}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="medium"
            fullWidth
            disabled={isSubmitting}
            sx={{
              padding: "16.5px 14px",
              fontWeight: "600",
              letterSpacing: "0.06em",
              bgcolor: theme.palette.secondary.main,
              fontSize: "large",
              mt: 3,
            }}
          >
            {isSubmitting ? "Loading..." : "updateyourpassword"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
