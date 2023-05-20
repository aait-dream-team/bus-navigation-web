import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const AdminRoutes = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return <>AdminRoutes</>;
};

export default AdminRoutes;
