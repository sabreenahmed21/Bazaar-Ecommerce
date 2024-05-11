/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../Redux/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const currentUser = useSelector(selectCurrentUser);
  const accessToken = currentUser?.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const onSubmit = async (currentPassword) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}/api/delete-me`,
        {
          data: currentPassword,
          headers :{
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(currentPassword),
        }
      );
      Swal.fire({
        icon: "success",
        title: `${res.data.message}`,
        timer: 3000,
        showConfirmButton: false,
      });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{bgcolor:'#fff', mt:4, py:'1px'}}>
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
            {t("deleteaccount.DeleteYourAccount")}
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
            {t("deleteaccount.msgToDeteteAccount")}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box align="left" my={3}>
              <label>
                {t("currentPassword")} <span style={{ color: red[700] }}>*</span>
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
              {t("deleteaccount.DeleteYourAccount")}
            </Button>
            <Link to={"/"}>
              <Button
                type="submit"
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
                {t("backToHome")}
              </Button>
            </Link>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default DeleteAccount;
