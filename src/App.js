import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "scenes/layout";
import AdminRoutes from "scenes/adminRoutes";
import Terminal from "scenes/terminal";
import Report from "scenes/report";
import Settings from "scenes/settings";
import AddNetwork from "scenes/addNetwork";
import Overview from "scenes/overview";
import SuperadminRoutes from "scenes/superadminRoutes";
import AddRoute from "scenes/addRoute";
import AddTerminal from "scenes/addTerminal";
import Network from "scenes/network";
import Login from "scenes/login";
import { setUserType, setUserId } from "state";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const userType = useSelector((state) => state.global.userType);
  const userId = useSelector((state) => state.global.userId);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve data from local storage
    const localUserId = localStorage.getItem("userId");
    const localUserType = localStorage.getItem("userType");

    // If data exists in local storage, set it as component state
    if (localUserId !== 'null' && localUserId !== userId) {
      dispatch(setUserId(localUserId));
    }

    if (localUserType !== 'null' && localUserType !== userType) {
      dispatch(setUserType(localUserType));
    }
  });

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem("userId", userId);
    localStorage.setItem("userType", userType);
  }, [userId, userType]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              {/* common Routes */}
              <Route
                path="/"
                element={
                  userType === "admin" ? (
                    <Navigate to="/routes" replace />
                  ) : userType === "superadmin" ? (
                    <Navigate to="/overview" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/routes"
                element={
                  userType === "admin" ? (
                    <AdminRoutes />
                  ) : userType === "superadmin" ? (
                    <SuperadminRoutes />
                  ) : null
                }
              />
              <Route path="/settings" element={<Settings />} />

              {/* admin Routes */}
              {userType === "admin" && (
                <>
                  <Route path="/terminal" element={<Terminal />} />
                  <Route path="/addterminal" element={<AddTerminal />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/addRoute" element={<AddRoute />} />
                </>
              )}

              {/* super admin Routes */}
              {userType === "superadmin" && (
                <>
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/addNetwork" element={<AddNetwork />} />
                  <Route path="/network" element={<Network />} />
                </>
              )}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
