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
import Swal from "sweetalert2";
import { useVerifyCodeEmailMutation } from "../services/Jsonserverapi";

const Verify = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [tokenValid, setTokenValid] = React.useState("");

  useEffect(() => {
    setTokenValid("");
  }, [register]);

  const [verifyCodeEmail, { isLoading }] = useVerifyCodeEmailMutation();
  const handleVerify = async (data) => {
    await verifyCodeEmail(data)
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Verified",
          text: "Your email has been successfully verified. You can now log in. 💕",
          timer: 5000,
          showConfirmButton: false,
        });
        navigate("/login");
      })
      .catch((error) => {
        setTokenValid("Invalid verification code");
      });
  };

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
              sx={{
                fontWeight: "700",
                fontSize: "1.75rem",
                lineHeight: "1",
                letterSpacing: "0.006em",
              }}
            >
              Verify e-mail address
            </Typography>
          </Box>
          <Box mt="20px" border="1px gray solid" borderRadius="10px" p="20px">
            <Typography style={{ color: grey[600], marginBottom: "15px" }}>
            Enter the verification code sent to your email.
            </Typography>
            <form onSubmit={handleSubmit(handleVerify)}>
              <TextField
                type="text"
                fullWidth
                sx={{ marginTop: "5px", marginBottom: "5px" }}
                placeholder="enterVerificationCode"
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
                  ":hover": { bgcolor: theme.palette.text.yellow },
                  mt: 2,
                  fontSize: "large",
                }}
              >
                verify Email
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Verify;
