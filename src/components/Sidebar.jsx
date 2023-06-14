import React from "react";
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
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  RouteOutlined,
  SignpostOutlined,
  BusAlertOutlined,
  DashboardOutlined,
  HouseOutlined,
  ControlPointOutlined,
  CalendarMonth,
  CalendarViewDayTwoTone,
  TripOrigin,
  LogoutOutlined,
  ShapeLineOutlined
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import LogoutButton from "./Navbar"

let navItems = [];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const userType = useSelector((state) => state.global.userType);

  if (userType === "admin") {
    navItems = [
      {
        text: "Routes",
        icon: <RouteOutlined />,
      },
      {
        text: "Terminal",
        icon: <SignpostOutlined />,
      },
      {
        text: "Calendars",
        icon: <CalendarMonth />,
      },
      {
        text: "CalendarDates",
        icon: <CalendarViewDayTwoTone />,
      },
      {
        text: "Shapes",
        icon: <ShapeLineOutlined />,
      },
      {
        text: "Trips",
        icon: <TripOrigin />,
      },
      {
        text: "Report",
        icon: <BusAlertOutlined />,
      },
    ];
  }

  if (userType === "superadmin") {
    navItems = [
      {
        text: "Routes",
        icon: <RouteOutlined />,
      },
      {
        text: "Network",
        icon: <HouseOutlined />,
      },
      {
        text: "CreateAdmin",
        icon: <ControlPointOutlined />,
      },
    ];
  }

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
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Link
                    to="/"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      Bus Navigation System
                    </Typography>
                  </Link>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
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
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem" width="100%" sx={{
            display : "flex",
            alignContent : "center",
            justifyContent : "center"
          }}>
            <Divider />
            <Button
              variant="outlined"
              onClick={() => console.log("Hello")}
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                border : "none"
              }}
            >
              <LogoutOutlined sx={{ marginRight : "20px"}}/>
              Logout
            </Button>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
