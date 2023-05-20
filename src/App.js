import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "scenes/layout";
import AdminRoutes from "scenes/adminRoutes";
import Terminal from "scenes/terminal";
import Report from "scenes/report";
import Settings from "scenes/settings";
import AddNetwork from "scenes/addNetwork";
import Overview from "scenes/overview";
import SuperadminRoutes from "scenes/superadminRoutes";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              {/* should be replaced with the appropriate route for the admin and
              super admin */}
              <Route path="/" element={<Navigate to="/adminroutes" replace />} />

              {/* admin Routes */}
              <Route path="/adminroutes" element={<AdminRoutes />} />
              <Route path="/terminal" element={<Terminal />} />
              <Route path="/report" element={<Report />} />
              {/* super admin Routes */}
              <Route path="/overview" element={<Overview />} />
              <Route path="/superadminroutes" element={<SuperadminRoutes />} />
              <Route path="/addNetwork" element={<AddNetwork />} />
              {/* common Routes */}
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
