import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { selectCurrentUser, updatePassword } from "../../Redux/UserSlice";
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
import { useTranslation } from "react-i18next";

export default function UpdatePassword() {
  const currentUser = useSelector(selectCurrentUser);
  const accessToken = currentUser?.token;
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const handleSubmitPassword = async (data) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/api/updatePassword`,
        {
          passwordCurrent: data.passwordCurrent,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(updatePassword(response.data.data.user.password));
      Swal.fire({
        icon: "success",
        title: "Your password has been updated successfully",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate('/')
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message || "Something went wrong!",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{bgcolor:'#fff', mt:4}}>
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
              {t("updateyourpassword")}
            </Typography>
          </Box>
        <form onSubmit={handleSubmit(handleSubmitPassword)}>
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
              mt: 3
            }}
          >
            {isSubmitting ? "Loading..." : t("updateyourpassword") } 
          </Button>
        </form>
      </Box>
    </Container>
  );
}
