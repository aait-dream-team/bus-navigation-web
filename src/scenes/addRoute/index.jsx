import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Container,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import Header from "components/Header";
import { useCreateRouteMutation } from "state/api";

const AddRoute = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [routeShortName, setRouteShortName] = useState("");
  const [routeLongName, setRouteLongName] = useState("");
  const [routeDesc, setRouteDesc] = useState("");
  const [routeType, setRouteType] = useState("");
  const [routeColor, setRouteColor] = useState("");
  const [agency, setAgency] = useState("");
  const [open, setOpen] = useState(false); // snackbar state

  const [trigger, result] = useCreateRouteMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      routeShortName,
      routeLongName,
      routeDesc,
      routeType,
      routeColor,
      agency
    );
    // Handle form submission
    let data = undefined;
    try {
      data = await trigger({
        route_short_name: routeShortName,
        route_long_name: routeLongName,
        route_desc: routeDesc,
        route_type: routeType,
        route_color: routeColor,
        agency: agency,
      }).unwrap();
      navigate("/routes");
    } catch (e) {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          // display: "flex",
          direction: "vertical",
          justifyContent: "center",
          height: "100vh",
          mt: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          mb="1rem"
        >
          <Header title="Add Route" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <TextField
              label="Route Short Name"
              value={routeShortName}
              onChange={(event) => setRouteShortName(event.target.value)}
              required
            />
            <TextField
              label="Route Long Name"
              value={routeLongName}
              onChange={(event) => setRouteLongName(event.target.value)}
              required
            />
            <TextField
              label="Route Description"
              value={routeDesc}
              onChange={(event) => setRouteDesc(event.target.value)}
              required
              multiline={true}
              minRows={3}
              maxRows={10}
            />
            <TextField
              label="Route Type"
              value={routeType}
              onChange={(event) => setRouteType(event.target.value)}
              required
            />
            <TextField
              label="Route Color"
              value={routeColor}
              onChange={(event) => setRouteColor(event.target.value)}
              required
            />
            <TextField
              label="Agency ID"
              value={agency}
              onChange={(event) => setAgency(event.target.value)}
              required
            />
          </Box>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: "1.5rem",
            }}
          >
            <Button
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              type="button"
              variant="outlined"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Container>
        </form>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong please make sure the inputs are correct.
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddRoute;
