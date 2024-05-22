import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaUserCheck } from "react-icons/fa6";
import { MdArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useLogoutMutation } from "../services/Jsonserverapi";
import { logout, selectCurrentAdmin } from "../redux/AdminSlice";

export default function AdminName() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CurrentAdmin = useSelector(selectCurrentAdmin);
  const [logoutMutation] = useLogoutMutation();
  const handlelogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setOpen(!open);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setOpen(!open);
  };

  return (
    <>
      <Box>
        <Tooltip title="Open settings">
          <Box
            onClick={handleOpenUserMenu}
            sx={{
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ color: "#fff", px: "8px" }}>
              <FaUserCheck fontSize={"small"} />
            </IconButton>
            <Typography sx={{ lineHeight: 0, fontSize: "0.9rem" }}>
              welcome, {CurrentAdmin?.data?.user?.name}
            </Typography>
            {open ? (
              <MdOutlineArrowDropUp />
            ) : (
              <MdArrowDropDown sx={{ fontSize: "16px" }} />
            )}
          </Box>
        </Tooltip>
        <Menu
          sx={{
            mt: "46px",
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Button
            onClick={() => navigate("/profilePage")}
            sx={{ width: "100px", margin: " 0 20px", display: "block" }}
          >
            your profile
          </Button>
          <Button
            onClick={handlelogout}
            sx={{ width: "100px", margin: " 0 20px" }}
          >
            log out
          </Button>
        </Menu>
      </Box>
    </>
  );
}
