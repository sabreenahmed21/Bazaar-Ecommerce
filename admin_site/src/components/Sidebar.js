/* eslint-disable no-undef */
// @ts-nocheck
import {
  MdAdminPanelSettings,
  MdReceiptLong,
  MdGroups,
  MdShoppingCartCheckout,
  MdHome,
} from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminName from "../profile/AdminName";
import { grey, secondary } from "../Colors";

const navItems = [
  {
    text: "Dashboard",
    icon: <MdHome />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <MdShoppingCartCheckout />,
  },
  {
    text: "Customers",
    icon: <MdGroups />,
  },
  {
    text: "Orders",
    icon: <MdReceiptLong />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default function Sidebar({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box>
            <Box m="1.5rem 2rem 2rem 2rem">
              <Stack color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    bazaar
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <IoChevronForwardOutline />
                  </IconButton>
                )}
              </Stack>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "1.25rem 0 1rem 2rem", fontWeight: 600 }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.background.default
                            : theme.palette.background.alt,
                        ":hover": {
                          backgroundColor:
                            active === lcText ? secondary[700] : grey[200],
                        },
                        color:
                          active === lcText
                            ? theme.palette.primary.main
                            : secondary[900],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          mr: 2,
                          fontSize: "large",
                          minWidth: 0,
                          color:
                            active === lcText
                              ? theme.palette.primary.main
                              : theme.palette.secondary.main,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && <IoChevronForwardOutline />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box>
            <Divider />
            <Box sx={{ mt: 1, mb: 2 }}>
              <AdminName />
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
