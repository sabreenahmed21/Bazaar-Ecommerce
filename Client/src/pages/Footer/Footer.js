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
import { FaInstagramSquare, FaPaypal } from "react-icons/fa";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.secondary.main,
        color: "#fff",
        py: 4,
        [theme.breakpoints.down("sm")]: {
          py: 2,
        },
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Link to="/">
                <img src={logo} alt="logo" className="logo" />
              </Link>
              <Box sx={{ display: "flex", alignItems:'center'  ,gap:1}}>
                <ImFacebook2 style={{ fontSize: "21px" , mx:'5px'}} />
                <FaInstagramSquare style={{ fontSize: "25px", px:'5px' }} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{display:'flex', flexDirection:'column', rowGap:'5px'}}>
              <Typography variant="h6" fontWeight={600}>Help Center</Typography>
              <Link href="#" underline="none" color={theme.palette.grey[300]}>
                FAQ
              </Link>
              <Link href="#" underline="none" color={theme.palette.grey[300]}>
                Contact Us
              </Link>
              <Link href="#" underline="none" color={theme.palette.grey[300]}>
                Returns and Refunds
              </Link>
              <Link href="#" underline="none" color={theme.palette.grey[300]}>
                Shipping and Delivery
              </Link>
              <Link href="#" underline="none" color={theme.palette.grey[300]}>
                Track Your Order
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{display:'flex', flexDirection:'column', rowGap:'5px'}}>
              <Typography variant="h6" fontWeight={600}>Legal</Typography>
              <Link href="#" underline="none" color={theme.palette.grey[300]}>
                Terms and Conditions
              </Link>
              <Link href="#" underline="none" color={theme.palette.grey[300]}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{display:'flex', flexDirection:'column', rowGap:3}}>
              <Box>
              <Typography variant="h6" fontWeight={600}>About Us</Typography>
              <Link href="#" underline="none" color={theme.palette.grey[300]}>
                Learn more about our company
              </Link>
              </Box>
              <Box>
              <Typography variant="h6" fontWeight={600}>Payment Methods</Typography>
              <Typography variant="body2" mb={1} color={theme.palette.grey[300]}>Secure Payment Processing</Typography>
              <FaPaypal style={{ fontSize: "24px"}} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}