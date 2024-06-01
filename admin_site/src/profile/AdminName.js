import React, { useState } from "react";
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
import { FaUserCheck } from "react-icons/fa6";
import { MdArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useLogoutMutation } from "../services/Jsonserverapi";
import { logout, selectCurrentAdmin } from "../redux/AdminSlice";
import { secondary } from "../Colors";

export default function AdminName() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
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
          <IconButton sx={{ px: "8px" }}>
            <FaUserCheck fontSize="small" />
          </IconButton>
          <Typography
            sx={{
              lineHeight: 0,
              fontSize: "0.9rem",
              color: secondary[900],
              fontWeight: 600,
            }}
          >
            Welcome, {currentAdmin?.data?.user?.name}
          </Typography>
          {anchorElUser ? (
            <MdOutlineArrowDropUp sx={{ fontSize: "16px" }} />
          ) : (
            <MdArrowDropDown sx={{ fontSize: "16px" }} />
          )}
        </Box>
      </Tooltip>
      <Menu
        sx={{ mt: 1 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Button
          onClick={() => {
            navigate("/profilePage");
            handleCloseUserMenu();
          }}
          sx={{
            width: "100px",
            margin: "0 20px",
            display: "block",
            textTransform: "capitalize",
            color: secondary[900],
          }}
        >
          Your Profile
        </Button>
        <Button
          onClick={() => {
            handleLogout();
            handleCloseUserMenu();
          }}
          sx={{
            width: "100px",
            margin: "0 20px",
            textTransform: "capitalize",
            color: secondary[900],
          }}
        >
          Log Out
        </Button>
      </Menu>
    </Box>
  );
}
