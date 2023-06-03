import { CssBaseline, ThemeProvider, Container, CircularProgress } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "scenes/layout";
import AdminRoutes from "scenes/adminRoutes";
import Terminal from "scenes/terminal";
import Report from "scenes/report";
import Settings from "scenes/settings";
import Overview from "scenes/overview";
import SuperadminRoutes from "scenes/superadminRoutes";
import CreateAdmin from "scenes/createAdmin";
import AddRoute from "scenes/addRoute";
import AddTerminal from "scenes/addTerminal";
import Network from "scenes/network";
import Login from "scenes/login";
import { setUserType, setUserId, setToken } from "state";
import CalendarDates from "scenes/calendarDates";
import AddCalendarDate from "scenes/addCalendarDates";
import Calendar from "scenes/calendar";
import AddCalendar from "scenes/addcalendar";
import Fares from "scenes/fares";
import AddFare from "scenes/addFare";
import Transfers from "scenes/transfers";
import AddTransfer from "scenes/addtransfer";
import Trips from "scenes/trip";
import AddTrip from "scenes/addTrip";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const userType = useSelector((state) => state.global.userType);
  const userId = useSelector((state) => state.global.userId);
  const token = useSelector((state) => state.global.token);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve data from local storage
    const localUserId = localStorage.getItem("userId");
    const localUserType = localStorage.getItem("userType");
    const localToken = localStorage.getItem("token");

    // If data exists in local storage, set it as component state
    if (localUserId !== "null" && localUserId !== userId) {
      dispatch(setUserId(localUserId));
    }

    if (localUserType !== "null" && localUserType !== userType) {
      dispatch(setUserType(localUserType));
    }

    if (localToken !== "null" && localToken !== token) {
      dispatch(setToken(localToken));
    }

    setIsLoading(false);
  }, [dispatch, userId, userType, token]);

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem("userId", userId);
    localStorage.setItem("userType", userType);
    localStorage.setItem("token", token);
  }, [userId, userType, token]);

  if (isLoading) {
    // Show a loading spinner or component while data is being loaded
    return (
      <Container
        maxWidth="100%"
        sx={{
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "inherit",
          width:"inherit"
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

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
                  ) : (
                    <Navigate to="/login" replace />
                  )
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
                  <Route path="/calendarDates" element={<CalendarDates />} />
                  <Route
                    path="/addCalendarDates"
                    element={<AddCalendarDate />}
                  />
                  <Route path="/calendars" element={<Calendar />} />
                  <Route path="/addcalendar" element={<AddCalendar />} />
                  <Route path="/fares" element={<Fares />} />
                  <Route path="/addfare" element={<AddFare />} />
                  <Route path="/transfers" element={<Transfers />} />
                  <Route path="/addtransfer" element={<AddTransfer />} />
                  <Route path="/trips" element={<Trips />} />
                  <Route path="/addtrip" element={<AddTrip />} />
                </>
              )}

              {/* super admin Routes */}
              {userType === "superadmin" && (
                <>
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/network" element={<Network />} />
                  <Route path="/createAdmin" element={<CreateAdmin />} />
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
