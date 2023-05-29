import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  Alert,
  Snackbar,
} from "@mui/material";
import Header from "components/Header";
import { useCreateTerminalMutation } from "state/api";

const AddTerminal = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [stopName, setStopName] = useState("");
  const [stopDesc, setStopDesc] = useState("");
  const [stopLat, setStopLat] = useState("");
  const [stopLong, setStopLong] = useState("");
  const [stopCode, setStopCode] = useState("");
  const [stopUrl, setStopUrl] = useState("");
  const [locationType, setLocationType] = useState("dkn");

  const [open, setOpen] = useState(false); // snackbar state

  const [trigger, result] = useCreateTerminalMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      stopName,
      stopDesc,
      stopLat,
      stopLong,
      stopCode,
      stopUrl,
      locationType,
      localStorage.getItem("userId")
    );
    // Handle form submission
    let data = undefined;
    try {
      data = await trigger({
        stop_name: stopName,
        stop_desc: stopDesc,
        stop_lat: stopLat,
        stop_long: stopLong,
        stop_code: stopCode,
        stop_url: stopUrl,
        location_type: locationType,
        admin: localStorage.getItem("userId"),
      }).unwrap();
      navigate("/terminal");
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
          <Header title="Add Terminal" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <TextField
              label="Terminal Name"
              value={stopName}
              onChange={(event) => setStopName(event.target.value)}
              required
            />
            <TextField
              label="Terminal Description"
              value={stopDesc}
              onChange={(event) => setStopDesc(event.target.value)}
              required
              multiline={true}
              minRows={3}
              maxRows={10}
            />
            <TextField
              label="Terminal URL"
              value={stopUrl}
              onChange={(event) => setStopUrl(event.target.value)}
              required
            />
            <TextField
              label="Terminal Code"
              value={stopCode}
              onChange={(event) => setStopCode(event.target.value)}
              required
            />
            <TextField
              label="Latitude"
              value={stopLat}
              onChange={(event) => setStopLat(event.target.value)}
              required
            />
            <TextField
              label="Longitude"
              value={stopLong}
              onChange={(event) => setStopLong(event.target.value)}
              required
            />
          </Box>
          <Box display="grid" justifyContent="center" gap={2} mt="2rem">
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
          </Box>
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

export default AddTerminal;
