import { Box, Button, Container } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Profle() {
  const { t } = useTranslation();
  return (
    <Container>
      <Box
        my={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          flexDirection: "column",
        }}
      >
        <Link to={"/updateAccount"}>
          <Button variant="outlined"
          sx={{
            width: "200px"
          }}
          >
            {t("updateyouraccount")}
          </Button>
        </Link>
        <Link to={"/updatePassword"}>
          <Button variant="outlined" sx={{ width: "200px" }}>
            {t("updateyourpassword")}
          </Button>
        </Link>
        <Link to={"/deleteAccount"}>
          <Button
            variant="outlined"
            sx={{
              width: "200px",
              color: red[700],
              borderColor: red[700],
              ":hover": {
                backgroundColor: red[50],
                borderColor: red[900],
                transition: "all 0.5s ease-in-out",
              },
            }}
          >
            {t("deleteaccount.DeleteYourAccount")}
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
