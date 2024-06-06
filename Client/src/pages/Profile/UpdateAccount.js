import React from "react";
import UpdateProfilePhoto from "./UpdateProfilePhoto";
import UpdateUserData from "./UpdateUserData";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { selectCurrentUser } from "../../Redux/UserSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const formatDate = (isoDate) => {
  if (!isoDate) return null;
  return new Date(isoDate).toLocaleDateString();
};

const UserInfoItem = ({ label, value }) => (
  <Typography
    variant="body1"
    color="initial"
    fontWeight={600}
    letterSpacing={1.5}
    display={"flex"}
    flexDirection={"row"}
    gap={1}
  >
    {label} :
    <Typography variant="body1" color="initial">
      {value}
    </Typography>
  </Typography>
);

export default function UpdateAccount() {
  const currentUser = useSelector(selectCurrentUser);
  const { name, email, createdAt } = currentUser?.data?.user || {};
  const { t } = useTranslation();
  return (
    <Container>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container spacing={2} gap={2} m={0}>
          <Grid xs={12} lg={4}>
            <Box sx={{ bgcolor: "#8080802e", p: 2 }}>
              <Typography
                variant="h5"
                sx={{ textTransform: "capitalize", fontWeight: "bold", mb: 2 }}
              >
                Change avatar
              </Typography>
              <UpdateProfilePhoto />
            </Box>
          </Grid>
          <Grid xs={12} lg={7}>
            <Box sx={{ bgcolor: "#8080802e", p: 2 }}>
              <Typography
                variant="h5"
                sx={{ textTransform: "capitalize", fontWeight: "bold", mb: 2 }}
              >
                account settings
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  my: 5,
                  pl: 2,
                }}
              >
                <UpdateUserData />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"start"}
                  justifyContent={"center"}
                  gap={2}
                  width={"100%"}
                >
                  <UserInfoItem label="UserName" value={name || "N/A"} />
                  <UserInfoItem label="Email" value={email || "N/A"} />
                  <UserInfoItem
                    label="createdAt"
                    value={formatDate(createdAt) || "N/A"}
                  />
                </Box>
                <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: 2,
                  flexDirection: {xs:'column', sm:'row'}
                }}
              >
                <Link to={"/updatePassword"}>
                  <Button variant="outlined" sx={{ width: "200px" , textTransform:'capitalize'}}>
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
                      textTransform:'capitalize'
                    }}
                  >
                    {t("deleteaccount.DeleteYourAccount")}
                  </Button>
                </Link>
              </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
