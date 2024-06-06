import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { useForgetPasswordMutation } from "../services/Jsonserverapi";


export default function Forgotpassword() {
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const handleForgetPassword = async (email) => {
    await forgetPassword(email)
      .unwrap()
      .then(() => {
        navigate("/verifypassword");
      })
      .catch((error) => {
        setEmailError(error.data.message);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setEmailError("");
  }, [register]);

  return (
    <>
      {isLoading && <LinearProgress determinate />}
      <Container maxWidth="sm" sx={{ bgcolor: "#fff", mt: 4 }}>
        <Box
          pt="50px"
          pb="50px"
        >
          <Box textAlign={"center"} mb={3}>
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
             forget your password ?
            </Typography>
          </Box>
          <Box mt="20px" border="1px gray solid" borderRadius="10px" p="20px">
            <Typography style={{ color: grey[600], marginBottom: "15px" }}>
            Please enter your email address associated with your account, and we'll send you code to reset your password
            </Typography>

            <form noValidate onSubmit={handleSubmit(handleForgetPassword)}>
              <Box mb="20px">
                <label htmlFor="email">email</label>
                <TextField
                  type="email"
                  placeholder="you@email.com"
                  fullWidth
                  sx={{ marginTop: "5px", marginBottom: "5px" }}
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                  error={Boolean(errors.email || emailError)}
                />
                <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
                  {errors.email?.message || emailError}
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="medium"
                fullWidth
                sx={{
                  padding: "16.5px 14px",
                  fontWeight: "600",
                  letterSpacing: "0.06em",
                  bgcolor: theme.palette.text.yellow,
                  ":hover": { bgcolor: theme.palette.text.yellow },
                  fontSize: "large",
                }}
              >
                Send reset code
              </Button>
            </form>
            <Link
              to="/login"
              style={{
                color: theme.palette.text.main,
                textDecoration: "none",
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Go back
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
