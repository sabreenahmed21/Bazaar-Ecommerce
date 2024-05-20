/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Stack,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  Button,
  MenuItem,
  Paper,
  MenuList,
  ListItemIcon,
} from "@mui/material";
import banner3 from "../../assets/menhero.jpg";
import banner4 from "../../assets/banner-25.jpg";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Slider.css";
import { Pagination, Autoplay } from "swiper/modules";

import { BiCategory } from "react-icons/bi";

import CategoryMenu from "../CategoryMenu";

const mySlider = [
  { text: "men", link: banner3 },
  { text: "women", link: banner4 },
];

export default function Hero() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery("(min-width:900px)");

  const { t, i18n } = useTranslation();
  const storedLanguage = i18n.language;

  return (
    <>
      <Box
        sx={{
          display: isLargeScreen ? "grid" : "flex",
          gridTemplateColumns: isLargeScreen ? "1fr 2.5fr" : "none",
          alignItems: "center",
          justifyContent: "center",
          p: "30px 0",
          gap: 2,
          direction: storedLanguage === "ar" ? "rtl" : "ltr",
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Paper
            sx={{
              maxWidth: "100%",
              borderRadius: "10px",
              boxShadow: "none",
            }}
          >
            <MenuList
              sx={{
                p: 0,
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MenuItem
                  sx={{
                    backgroundColor: theme.palette.text.orange,
                    ":hover": { backgroundColor: theme.palette.text.orange },
                    borderRadius: "10px 10px 0 0",
                    py: "10px",
                    mb: "6px",
                  }}
                >
                  <ListItemIcon>
                    <BiCategory fontSize={"x-large"} />
                  </ListItemIcon>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      textTransform: "capitalize",
                      mx: "1px",
                    }}
                  >
                    {t("header3.categories")}
                  </Typography>
                </MenuItem>
                <CategoryMenu />
              </motion.div>
            </MenuList>
          </Paper>
        </Box>
        <Swiper
          key={storedLanguage}
          loop={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="general-slider swiper"
        >
          {mySlider.map((item, index) => {
            return (
              <SwiperSlide className="swiper-slide general-slide" key={index}>
                <img src={item.link} alt="img" />
                <Box className="overlay"></Box>
                <Stack
                  sx={{
                    position: "absolute",
                    top: "50% ",
                    transform: "translateY(-50%)",
                    left: "10%",
                    right: "10%",
                    textAlign: "start",
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.orange,
                        fontSize: "25px",
                        textTransform: "uppercase",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "20px",
                        },
                      }}
                    >
                      {t("hero.parag")}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "50px",
                        fontWeight: "700",
                        color: "#fff",
                        lineHeight: "65px",
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        mb: 1,
                        mt: 1,
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "38px",
                          fontWeight: "600",
                          lineHeight: "50px",
                          mb: "5px",
                          mt: "4px",
                        },
                      }}
                    >
                      {t(`hero.text.${item.text}`)}
                    </Typography>
                    <Typography
                      variant="span"
                      sx={{
                        color: theme.palette.grey[50],
                        fontSize: "18px",
                        textTransform: "capitalize",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "16px",
                        },
                      }}
                    >
                      {t("hero.parag2")}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      sx={{
                        width: "50%",
                        mt: 3,
                        textTransform: "capitalize",
                        backgroundColor: theme.palette.text.Lightyellow,
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "26px",
                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                        borderRadius: "0px",
                        py: "15px",
                        "&:hover": {
                          backgroundColor: theme.palette.text.yellow,
                          boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                        },
                        [theme.breakpoints.down("sm")]: {
                          mx: "auto",
                          py: "10px",
                        },
                      }}
                    >
                      <Link
                        href={`/categoryPage?category=${item.text}`}
                        underline="none"
                        sx={{ color: "#fff" }}
                        aria-label={`Shop now in ${item.text} category`}
                      >
                        {t("hero.shopnow")}
                      </Link>
                    </Button>
                  </Box>
                </Stack>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </>
  );
}
