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
  const [stopNameError, setStopNameError] = useState(false);
  const [stopDesc, setStopDesc] = useState("");
  const [stopDescError, setStopDescError] = useState(false);
  const [stopLat, setStopLat] = useState("");
  const [stopLatError, setStopLatError] = useState(false);
  const [stopLong, setStopLong] = useState("");
  const [stopLongError, setStopLongError] = useState(false);
  const [stopCode, setStopCode] = useState("");
  const [stopCodeError, setStopCodeError] = useState(false);
  const [stopUrl, setStopUrl] = useState("");
  const [stopUrlError, setStopUrlError] = useState(false);
  const [locationType, setLocationType] = useState("dkn");

  const [open, setOpen] = useState(false); // snackbar state

  const [trigger, result] = useCreateTerminalMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "stopName") {
      setStopName(value);
      setStopNameError(false);
    }
    if (name === "stopDesc") {
      setStopDesc(value);
      setStopDescError(false);
    }
    if (name === "stopLat") {
      setStopLat(value);
      setStopLatError(false);
    }
    if (name === "stopLong") {
      setStopLong(value);
      setStopLongError(false);
    }
    if (name === "stopCode") {
      setStopCode(value);
      setStopCodeError(false);
    }
    if (name === "stopUrl") {
      setStopUrl(value);
      setStopUrlError(false);
    }
  };

  const handleSubmit = async (event) => {
    if (stopName === "") {
      setStopNameError(true);
      return;
    }
    if (stopDesc === "") {
      setStopDescError(true);
      return;
    }
    if (stopUrl === "" || !stopUrl.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi))) {
      setStopUrlError(true);
      return;
    }
    if (stopCode === "") {
      setStopCodeError(true);
      return;
    }
    if (stopLat === "") {
      setStopLatError(true);
      return;
    }
    if (stopLong === "") {
      setStopLongError(true);
      return;
    }

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
              name="stopName"
              value={stopName}
              onChange={handleInputChange}
              required
              error={stopNameError}
              helperText={stopNameError ? "Terminal name is required" : ""}
            />
            <TextField
              label="Terminal Description"
              value={stopDesc}
              name="stopDesc"
              onChange={handleInputChange}
              required
              multiline={true}
              minRows={3}
              maxRows={10}
              error={stopDescError}
              helperText={
                stopDescError ? "Terminal description is required" : ""
              }
            />
            <TextField
              label="Terminal URL"
              name="stopUrl"
              value={stopUrl}
              onChange={handleInputChange}
              required
              error={stopUrlError}
              helperText={stopUrlError ? "Invalid Terminal URL" : ""}
            />
            <TextField
              label="Terminal Code"
              name="stopCode"
              value={stopCode}
              onChange={handleInputChange}
              required
              error={stopCodeError}
              helperText={stopCodeError ? "Terminal code is required" : ""}
            />
            <TextField
              label="Latitude"
              name="stopLat"
              value={stopLat}
              onChange={handleInputChange}
              required
              error={stopLatError}
              helperText={stopLatError ? "Terminal latitude is required" : ""}
            />
            <TextField
              label="Longitude"
              name="stopLong"
              value={stopLong}
              onChange={handleInputChange}
              required
              error={stopLongError}
              helperText={stopLongError ? "Terminal longitude is required" : ""}
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
