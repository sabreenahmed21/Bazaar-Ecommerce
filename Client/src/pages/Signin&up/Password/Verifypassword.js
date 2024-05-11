import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useVerifyCodePasswordMutation } from "../../../services/Jsonserverapi";
import { useTranslation } from "react-i18next";
// import axios from "axios";

const Verifypassword = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const storedLanguage = i18n.language;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [tokenValid, setTokenValid] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTokenValid("");
  }, [register]);

  // const handleVerifyCode = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_URL}/api/verifycode`,
  //       {
  //         code: data.verificationCode,
  //       }
  //     );
  //     const token = response.data.data;
  //     navigate(`/resetpassword/${token}`);
  //   } catch (error) {
  //     setTokenValid(error.response.data.message);
  //   }
  // };

  const [verifyCodePassword, { isLoading }] = useVerifyCodePasswordMutation();
  const handleVerifyCode = async (data) => {
    const response = await verifyCodePassword(data.verificationCode);
    if (response && response.data && response.data.data) {
      const token = response.data.data;
      navigate(`/resetpassword/${token}`);
    } else {
      setTokenValid(response.error.data.message);
    }
  };

  return (
    <>
      {isLoading && <LinearProgress determinate />}
      <Container maxWidth="sm" sx={{bgcolor:'#fff', mt:4}}>
        <Box pt="50px" pb="50px" sx={{ direction: storedLanguage === 'ar' ? "rtl":"ltr"}}>
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
              {t("login&signup.enterSecurityCode")}
            </Typography>
          </Box>
          <Box mt="20px" border="1px gray solid" borderRadius="10px" p="20px">
            <Typography style={{ color: grey[600], marginBottom: "15px" }}>
            {t("login&signup.msgVerifyPassword")}
            </Typography>
            <form noValidate onSubmit={handleSubmit(handleVerifyCode)}>
              <TextField
                type="text"
                fullWidth
                placeholder={t("login&signup.enterCode")}
                sx={{ marginTop: "5px", marginBottom: "5px" }}
                {...register("verificationCode", {
                  required: {
                    value: true,
                    message: "Verification code is required",
                  },
                })}
                error={Boolean(errors.verificationCode || tokenValid)}
              />
              <Typography style={{ color: red[900], fontSize: "0.8rem" }}>
                {errors.verificationCode?.message || tokenValid}
              </Typography>
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
                ':hover':{bgcolor: theme.palette.text.yellow},
                  fontSize: "large",
                  mt: 3,
                }}
              >
                {t("login&signup.continue")}
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Verifypassword;
