import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import imgg from "../assets/Screenshot 2023-11-14 113805.png";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

export default function Notfound() {
  const { t } = useTranslation();
  return (
    <Container>
      <Box pt="50px" pb="50px">
        <Box textAlign="center">
          <Typography
            variant="h2"
            sx={{
              fontWeight: "900",
              fontSize: "1.75rem",
              lineHeight: "1",
              letterSpacing: "0.06em",
            }}
          >
            {t("pageNotFound.titlenotfound")}
          </Typography>
          <Typography
            style={{
              color: grey[600],
              width: "100%",
              maxWidth: "48vw",
              margin: "50px auto",
              fontSize:'1.1rem'
            }}
          >
            {t("pageNotFound.msgnotfound")}
          </Typography>
          <img src={imgg} alt="not found 404" />
        </Box>
        <Button
          variant="contained"
          size="medium"
          sx={{
            padding: "16.5px 14px",
            margin: " 50px  auto",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => window.location.pathname = "/"}
        >
          {t("backToHome")}
        </Button>
      </Box>
    </Container>
  );
}
