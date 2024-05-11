import React from "react";
import UpdateProfilePhoto from "./UpdateProfilePhoto";
import UpdateUserData from "./UpdateUserData";
import { Box, Container, Typography } from "@mui/material";
import { selectCurrentUser } from "../../Redux/UserSlice";
import { useSelector } from "react-redux";

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

  return (
    <Container
      sx={{
        py: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      maxWidth="sm"
    >
      <UpdateProfilePhoto />
      <UpdateUserData />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        justifyContent={"center"}
        mt={5}
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
    </Container>
  );
}
