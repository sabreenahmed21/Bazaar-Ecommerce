import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const Thanks = () => {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ textAlign: "center", direction: i18n.language === 'ar'? 'rtl':'ltr' }}>
      <Typography variant="h4" gutterBottom sx={{fontWeight:600}}>
        {t("payment.thanks")}
      </Typography>
      <Typography variant="body1" sx={{fontWeight:500, fontSize:'1.5rem'}}>
        {t("payment.request")}
      </Typography>
      <Typography variant="body1" sx={{fontWeight:500, fontSize:'1.5rem'}}>
        {t("payment.charge")}
      </Typography>
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', columnGap:2, my:2}}>
      <Button variant="contained" color="primary" component={Link} to="/order">
        {t("payment.viewOrder")}
      </Button>
      <Button variant="contained" color="primary" component={Link} to="/products">
        {t("payment.continueShopping")}
      </Button>
      </Box>
    
    </div>
  );
};

export default Thanks;
