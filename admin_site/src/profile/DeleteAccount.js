/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
import { logout, selectCurrentAdmin } from "../redux/AdminSlice";
import { useDeleteAccountMutation } from "../services/Jsonserverapi";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const CurrentAdmin = useSelector(selectCurrentAdmin);
  const accessToken = CurrentAdmin?.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const [deleteAccount] = useDeleteAccountMutation();

  const onSubmit = async ({ currentPassword }) => {
    try {
      const res = await deleteAccount({
        currentPassword,
        accessToken,
      }).unwrap();
      Swal.fire({
        icon: "success",
        title: `${res.message}`,
        timer: 3000,
        showConfirmButton: false,
      });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      setErrorMessage(error.data.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "#fff", mt: 4, py: "1px" }}>
      <Box my={8}>
        <Box align="center" my={5}>
          <Typography
            variant="h2"
            textTransform={"capitalize"}
            sx={{
              fontWeight: "700",
              fontSize: "1.75rem",
              lineHeight: "1",
              letterSpacing: "0.006em",
              textTransform: "capitalize",
            }}
          >
            Delete Your Account
          </Typography>
        </Box>
        <Box
          my="20px"
          border="1px gray solid"
          borderRadius="10px"
          p="20px"
          align="center"
        >
          <Typography
            gutterBottom
            variant="body1"
            sx={{ textTransform: "capitalize", color: theme.palette.grey[800] }}
          >
            Please enter your current password associated with your account, to delete your account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box align="left" my={3}>
              <label>
                Current Password <span style={{ color: red[700] }}>*</span>
              </label>
              <TextField
                {...register("currentPassword", { required: true })}
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.currentPassword || !!errorMessage}
                helperText={
                  errors.currentPassword
                    ? "Current password is required"
                    : errorMessage || ""
                }
                onInput={clearErrorMessage}
              />
            </Box>
            <Button
              type="submit"
              variant="outlined"
              size="medium"
              fullWidth
              sx={{
                padding: "16.5px 14px",
                fontWeight: "600",
                letterSpacing: "0.06em",
                color: theme.palette.secondary.main,
                fontSize: "large",
                mb: 1,
              }}
            >
              Delete Your Account
            </Button>
            <Link to={"/"}>
              <Button
                type="button"
                variant="contained"
                size="medium"
                fullWidth
                sx={{
                  padding: "16.5px 14px",
                  fontWeight: "600",
                  letterSpacing: "0.06em",
                  bgcolor: theme.palette.secondary.main,
                  fontSize: "large",
                  ":hover": { bgcolor: theme.palette.secondary.main },
                }}
              >
                back To Home
              </Button>
            </Link>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default DeleteAccount;
