import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "components/Header";
import { useCreateReportMutation } from "state/api";

const Report = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [affectedEntity, setAffectedEntity] = useState("");
  const [affectedEntityError, setAffectedEntityError] = useState(false);
  const [entityId, setEntityId] = useState("");
  const [entityIdError, setEntityIdError] = useState(false);
  const [cause, setCause] = useState("");
  const [causeError, setCauseError] = useState(false);
  const [effect, setEffect] = useState("");
  const [effectError, setEffectError] = useState(false);
  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState("");
  const [startTimestampError, setStartTimestampError] = useState(false);

  const [trigger, result] = useCreateReportMutation();
  const [open, setOpen] = useState(false); // snackbar state

  const causes = [
    "UNKNOWN_CAUSE",
    "OTHER_CAUSE",
    "TECHNICAL_PROBLEM",
    "STRIKE",
    "DEMONSTRATION",
    "ACCIDENT",
    "HOLIDAY",
    "WEATHER",
    "MAINTENANCE",
    "CONSTRUCTION",
    "POLICE_ACTIVITY",
    "MEDICAL_EMERGENCY",
  ];

  const effects = [
    "NO_SERVICE",
    "REDUCED_SERVICE",
    "SIGNIFICANT_DELAYS",
    "DETOUR",
    "ADDITIONAL_SERVICE",
    "MODIFIED_SERVICE",
    "OTHER_EFFECT",
    "UNKNOWN_EFFECT",
    "STOP_MOVED",
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "affectedEntity":
        setAffectedEntity(value);
        setAffectedEntityError(false);
        break;
      case "entityId":
        setEntityId(value);
        setEntityIdError(false);
        break;
      case "cause":
        setCause(value);
        setCauseError(false);
        break;
      case "effect":
        setEffect(value);
        setEffectError(false);
        break;
      case "duration":
        setDuration(value);
        setDurationError(false);
        break;
      case "startTimestamp":
        setStartTimestamp(value);
        setStartTimestampError(false);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      affectedEntity,
      entityId,
      cause,
      effect,
      duration,
      startTimestamp
    );

    if (affectedEntity === "") {
      setAffectedEntityError(true);
      return;
    }

    if (entityId === "") {
      setEntityIdError(true);
      return;
    }

    if (cause === "") {
      setCauseError(true);
      return;
    }

    if (effect === "") {
      setEffectError(true);
      return;
    }

    if (duration === "") {
      setDurationError(true);
      return;
    }

    if (startTimestamp === "") {
      setStartTimestampError(true);
      return;
    }

    // Handle form submission
    let data = undefined;
    try {
      data = await trigger({
        affected_entity: affectedEntity,
        entity_id: entityId,
        cause: cause,
        effect: effect,
        duration: duration,
        start_timestamp: startTimestamp,
      }).unwrap();
      navigate("/");
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
          <Header title="Report" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Affected Entity
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={affectedEntity}
                name="affectedEntity"
                label="Affected Entity"
                onChange={handleInputChange}
                error={affectedEntityError}
                helperText={
                  affectedEntityError ? "Affected Entity is required" : ""
                }
              >
                <MenuItem value="route">Route</MenuItem>
                <MenuItem value="agency">Agency</MenuItem>
                <MenuItem value="trip">Trip</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Entity ID"
              value={entityId}
              name="entityId"
              onChange={handleInputChange}
              required
              error={entityIdError}
              helperText={entityIdError ? "Entity ID is required" : ""}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cause </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cause}
                name="cause"
                label="Cause"
                onChange={handleInputChange}
                error={causeError}
                helperText={causeError ? "Cause is required" : ""}
              >
                {causes.map((cause) => (
                  <MenuItem value={cause}>{cause}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Effect </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={effect}
                name="effect"
                label="Effect"
                onChange={handleInputChange}
                error={effectError}
                helperText={effectError ? "Effect is required" : ""}
              >
                {effects.map((effect) => (
                  <MenuItem value={effect}>{effect}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Duration"
              value={duration}
              name="duration"
              onChange={handleInputChange}
              required
              error={durationError}
              helperText={durationError ? "Duration is required" : ""}
            />
            <TextField
              label="Start Timestamp"
              value={startTimestamp}
              name="startTimestamp"
              onChange={handleInputChange}
              required
              error={startTimestampError}
              helperText={
                startTimestampError ? "Start Timestamp is required" : ""
              }
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
          Something Went Wrong, Please Try again!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Report;
