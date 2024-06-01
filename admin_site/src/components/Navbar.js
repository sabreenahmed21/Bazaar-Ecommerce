/* eslint-disable no-unused-expressions */
// @ts-nocheck
import {
  AppBar,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import { MdMenu, MdSearch } from "react-icons/md";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const theme = useTheme();
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
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <MdSearch />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
