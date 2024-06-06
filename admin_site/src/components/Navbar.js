/* eslint-disable no-unused-expressions */
// @ts-nocheck
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar
} from "@mui/material";
import { MdMenu } from "react-icons/md";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <AppBar position="static" sx={{ background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MdMenu />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
