// @ts-nocheck
import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../redux/AdminSlice";

function Layout() {
  const isNonMobile = useMediaQuery("(min-width:1200px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentAdmin = useSelector(selectCurrentAdmin);
  
  if (!currentAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <Sidebar
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth="250px"
      />
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;