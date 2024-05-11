/* eslint-disable react-hooks/rules-of-hooks */
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Divider,
  useTheme,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSignInMutation } from "../../services/Jsonserverapi.js";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, signInSuccess } from "../../Redux/UserSlice.js";
import { useTranslation } from "react-i18next";

export default function Login() {
  const theme = useTheme();
  const { t , i18n} = useTranslation();
  const storedLanguage = i18n.language;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [signIn, { isLoading }] = useSignInMutation();

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [register]);

  if (currentUser) {
    navigate("/");
    return null;
  }

  const clearEmailError = () => {
    setEmailError("");
  };

  const clearPasswordError = () => {
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (formData) => {
    try {
      const data = await signIn(formData).unwrap();
      dispatch(signInSuccess(data));
      window.location.pathname = "/";
    } catch (err) {
      if (err.data && err.data.message.includes("Email")) {
        setEmailError(err.data.message);
      } else {
        setPasswordError(err.data.message);
      }
    }
  };

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
              {t("login&signup.joinTheBazaarMarket")}
            </Typography>
          </Box>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box mb="20px">
              <label>{t("login&signup.email")}</label>
              <TextField
                id="email"
                type="email"
                fullWidth
                sx={{ marginTop: "7px", marginBottom: "7px" }}
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
                error={!!errors.email || !!emailError}
                helperText={
                  errors.email ? "Email is required" : emailError || ""
                }
                onInput={() => {
                  clearEmailError();
                }}
              />
            </Box>
            <Box mb="20px">
              <label>{t("login&signup.password")}</label>
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                sx={{ marginTop: "7px", marginBottom: "7px" }}
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                error={!!errors.password || !!passwordError}
                helperText={
                  errors.password ? "Password is required" : passwordError || ""
                }
                onInput={() => {
                  clearPasswordError();
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                }
                label={t("login&signup.showPassword")}
                labelPlacement="end"
              />
            </Box>
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
              }}
            >
              {t("login&signup.login")}
            </Button>
          </form>
          <Link
            to="/forgetPassword"
            style={{
              color: theme.palette.text.main,
              display: "flex",
              margin: " 20px 0",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            {t("login&signup.forgottenPassword")}
          </Link>
          <Divider>{t("login&signup.NEWTOBAZAAR")}</Divider>
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <Typography color="initial">{t("login&signup.Don'thaveanaccount")}</Typography>
            <Link
              to="/signup"
              style={{
                color: theme.palette.text.main,
                paddingLeft: "5px",
                paddingRight: "5px"
              }}
            >
              {t("login&signup.signup")}
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
