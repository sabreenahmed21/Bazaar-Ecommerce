import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { useSignUpMutation } from "../services/Jsonserverapi";

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [signUp, { isLoading }] = useSignUpMutation();
  const handleSubmitForm = async (data) => {
    console.log(data);
    data.role = "admin";
    await signUp(data)
      .unwrap()
      .then(() => {
        navigate("/verify-email");
      })
      .catch((error) => {
        if (error.data && error.data.message.includes("Email")) {
          setEmailError(error.data.message);
        } else {
          setMessageError(error.data.message);
        }
      });
  };

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const password = watch("password", "");

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
              variant="h1"
              textTransform={"capitalize"}
              sx={{ fontSize: "25px", fontWeight: 700, letterSpacing: "1px" }}
            >
              Create Admin Bazaar Account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
            <Box>
              <TextField
                type="text"
                label="User Name"
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                {...register("name", {
                  required: { value: true, message: "Username is required" },
                })}
              />
              <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
                {errors.name?.message}
              </Typography>
            </Box>

            <Box>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                id="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email value",
                  },
                })}
              />
              <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
                {errors.email?.message || emailError}
              </Typography>
            </Box>

            <Box>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                id="password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
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
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: {
                    value: true,
                    message: "PasswordConfirm is required",
                  },
                  validate: {
                    matchPassword: (value) => {
                      return value === password || "Passwords do not match";
                    },
                  },
                })}
              />
              <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
                {errors.passwordConfirm?.message}
              </Typography>
            </Box>

            <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
              {messageError}
            </Typography>

            <Button
              variant="contained"
              size="medium"
              fullWidth
              type="submit"
              sx={{
                padding: "16.5px 14px",
                bgcolor: theme.palette.text.yellow,
                ":hover": { bgcolor: theme.palette.text.yellow },
                fontWeight: 600,
                fontSize: "large",
                marginTop: "15px",
              }}
            >
              Sign UP
            </Button>
          </form>

          <Box display="flex" my={4}>
            <Typography color="initial">Have Account?</Typography>
            <Link
              to="/login"
              style={{
                color: theme.palette.text.main,
                paddingLeft: "5px",
                paddingRight: "5px"
              }}
            >
              Log in
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
