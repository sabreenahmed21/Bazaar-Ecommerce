import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCcMastercard } from "react-icons/fa6";

export default function Footer() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.secondary.main,
        color: "#fff",
        py: 4,
        [theme.breakpoints.down("sm")]: {
          py: 2,
        },
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Link to="/">
                  <img src={logo} alt="logo" className="logo" />
                </Link>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ImFacebook2 style={{ fontSize: "21px", mx: "5px" }} />
                  <FaInstagramSquare style={{ fontSize: "25px", px: "5px" }} />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
              >
                <Typography variant="h6" fontWeight={600}>
                  {t("footer.helpCenter")}
                </Typography>
                <Link href="#" underline="none" color={theme.palette.grey[300]}>
                  {t("footer.FAQ")}
                </Link>
                <Link href="#" underline="none" color={theme.palette.grey[300]}>
                  {t("footer.contactUs")}
                </Link>
                <Link href="#" underline="none" color={theme.palette.grey[300]}>
                  {t("footer.returnsandRefunds")}
                </Link>
                <Link href="#" underline="none" color={theme.palette.grey[300]}>
                  {t("footer.shippingandDelivery")}
                </Link>
                <Link href="#" underline="none" color={theme.palette.grey[300]}>
                  {t("footer.trackYourOrder")}
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
              >
                <Typography variant="h6" fontWeight={600}>
                  {t("footer.legal")}
                </Typography>
                <Link href="#" underline="none" color={theme.palette.grey[300]}>
                  {t("footer.termsandConditions")}
                </Link>
                <Link href="#" underline="none" color={theme.palette.grey[300]}>
                  {t("footer.privacyPolicy")}
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {t("footer.aboutUs")}
                  </Typography>
                  <Link
                    href="#"
                    underline="none"
                    color={theme.palette.grey[300]}
                  >
                    {t("footer.learnmoreaboutourcompany")}
                  </Link>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {t("footer.paymentMethods")}
                  </Typography>
                  <Typography
                    variant="body2"
                    mb={1}
                    color={theme.palette.grey[300]}
                  >
                    {t("footer.securePaymentProcessing")}
                  </Typography>
                  <FaCcMastercard style={{ fontSize: "24px" }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
