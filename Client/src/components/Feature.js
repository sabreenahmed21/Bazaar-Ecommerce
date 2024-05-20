// @ts-nocheck
import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  MdAccessTime,
  MdOutlineLocalShipping,
  MdOutlineMonetizationOn,
  MdOutlinePayments,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Grid() {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box sx={{ bgcolor: "#fff", my: 3 }}>
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
            padding: "25px 10px",
            gap: "52px",
            [theme.breakpoints.down("sm")]: { gap: "60px" },
            backgroundColor: theme.palette.background.alt,
          }}
          divider={
            useMediaQuery("(min-width:992px)") ? (
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ borderColor: theme.palette.grey[400] }}
              />
            ) : null
          }
        >
          <Icondata
            icon={<MdOutlineLocalShipping fontSize="xx-large" />}
            title="FastDelivery"
            subtitle="startfrom10"
          />
          <Icondata
            icon={<MdOutlineMonetizationOn fontSize="xx-large" />}
            title="MoneyGuarantee"
            subtitle="7days"
          />
          <Icondata
            icon={<MdAccessTime fontSize="xx-large" />}
            title="365days"
            subtitle="ForFreeReturn"
          />
          <Icondata
            icon={<MdOutlinePayments fontSize="xx-large" />}
            title="Payment"
            subtitle="SecureSystem"
          />
        </Stack>
      </Box>
    </motion.div>
  );
}

const Icondata = ({ icon, title, subtitle }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: "10px" }}
    >
      {icon}
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: theme.palette.text.light }}
        >
          {t(`features.${title}`)}
        </Typography>
        <Typography
          variant="span"
          sx={{
            fontWeight: 500,
            color: theme.palette.grey[600],
            fontSize: "13px",
            letterspacing: "1px",
          }}
        >
          {t(`features.${subtitle}`)}
        </Typography>
      </Box>
    </Box>
  );
};
