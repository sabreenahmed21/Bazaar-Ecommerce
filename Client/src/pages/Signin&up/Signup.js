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
import { useSignUpMutation } from "../../services/Jsonserverapi";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t , i18n} = useTranslation();
  const storedLanguage = i18n.language;
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [signUp, { isLoading }] = useSignUpMutation();
  const handleSubmitForm = async (data) => {
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
    reset,
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const password = watch("password", "");

  useEffect(() => {
    setEmailError("");
  }, [register]);

  return (
    <>
      {isLoading && <LinearProgress determinate />}

      <Container maxWidth="sm" sx={{bgcolor:'#fff', mt:4}}>
        <Box pt="50px" pb="50px" sx={{ direction: storedLanguage === 'ar' ? "rtl":"ltr"}}>
          <Box textAlign={"center"} mb={3}>
            <Typography
              variant="h1"
              textTransform={"capitalize"}
              sx={{ fontSize: "25px", fontWeight: 700, letterSpacing: "1px" }}
            >
              {t("login&signup.createBazaarAccount")}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
            <Box>
              <TextField
                type="text"
                label={t("login&signup.username")}
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
                label={t("login&signup.email")}
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
                  validate: {
                    notAdmin: (fieldValue) => {
                      return (
                        fieldValue.toLowerCase() !==
                          "sabreenahmed4444@gmail.com" ||
                        "Enter a different email address"
                      );
                    },
                  },
                })}
              />
              <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
                {errors.email?.message || emailError}
              </Typography>
            </Box>

            <Box>
              <TextField
                label={t("login&signup.password")}
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
                label={t("login&signup.confirmPassword")}
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
                ':hover':{bgcolor: theme.palette.text.yellow},
                fontWeight: 600,
                fontSize: "large",
                marginTop: "15px",
              }}
            >
              {t("login&signup.signup")}
            </Button>
            <Button type="button" onClick={() => reset()}>
            {t("login&signup.reset")}
            </Button>
          </form>

          <Box display="flex">
            <Typography color="initial">{t("login&signup.haveAccount")}</Typography>
            <Link
              to="/login"
              style={{
                color: theme.palette.text.main,
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              {t("login&signup.login")}
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
