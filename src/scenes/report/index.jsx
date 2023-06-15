import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Header from "components/Header";
import {
  useCreateReportMutation,
  useListOfAgenciesQuery,
  useListTripsQuery,
  useListOfRoutesQuery,
} from "state/api";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const Report = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // dropdown list of agencies
  const { data: rawAgencyList, isLoading: isAgencyListLoading } =
    useListOfAgenciesQuery();
  const [agencyList, setAgencyList] = useState([]);
  useEffect(() => {
    if (rawAgencyList) {
      setAgencyList(rawAgencyList);
    }
  }, [rawAgencyList]);

  // dropdown list of routes
  const { data: rawRouteList, isLoading: isRouteListLoading } =
    useListOfRoutesQuery();
  const [routeList, setRouteList] = useState([]);
  useEffect(() => {
    if (rawRouteList) {
      setRouteList(rawRouteList);
    }
  }, [rawRouteList]);

  // dropdown list of trips
  const { data: rawTripList, isLoading: isTripListLoading } =
    useListTripsQuery();
  const [tripList, setTripList] = useState([]);
  useEffect(() => {
    if (rawTripList) {
      setTripList(rawTripList);
    }
  }, [rawTripList]);

  const [affectedEntity, setAffectedEntity] = useState("");
  const [affectedEntityError, setAffectedEntityError] = useState(false);
  const [entityId, setEntityId] = useState("");
  const [cause, setCause] = useState("");
  const [causeError, setCauseError] = useState(false);
  const [effect, setEffect] = useState("");
  const [effectError, setEffectError] = useState(false);
  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState("");
  const [startTimestampError, setStartTimestampError] = useState(false);
  const [agencyId, setAgencyId] = useState("");
  const [agencyIdError, setAgencyIdError] = useState(false);
  const [routeId, setRouteId] = useState("");
  const [routeIdError, setRouteIdError] = useState(false);
  const [tripId, setTripId] = useState("");
  const [tripIdError, setTripIdError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);

  const [trigger, result] = useCreateReportMutation();

  const causes = [
    [1, "UNKNOWN_CAUSE"],
    [2, "OTHER_CAUSE"],
    [3, "TECHNICAL_PROBLEM"],
    [4, "STRIKE"],
    [5, "DEMONSTRATION"],
    [6, "ACCIDENT"],
    [7, "HOLIDAY"],
    [8, "WEATHER"],
    [9, "MAINTENANCE"],
    [10, "CONSTRUCTION"],
    [11, "POLICE_ACTIVITY"],
    [12, "MEDICAL_EMERGENCY"],
  ];

  const effects = [
    [1, "NO_SERVICE"],
    [2, "REDUCED_SERVICE"],
    [3, "SIGNIFICANT_DELAYS"],
    [4, "DETOUR"],
    [5, "ADDITIONAL_SERVICE"],
    [6, "MODIFIED_SERVICE"],
    [7, "OTHER_EFFECT"],
    [8, "UNKNOWN_EFFECT"],
    [9, "STOP_MOVED"],
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "affectedEntity":
        setAffectedEntity(value);
        setAffectedEntityError(false);
        break;
      case "agencyId":
        setAgencyId(value);
        setAgencyIdError(false);
        break;
      case "routeId":
        setRouteId(value);
        setRouteIdError(false);
        break;
      case "tripId":
        setTripId(value);
        setTripIdError(false);
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
      case "message":
        setMessage(value);
        setMessageError(false);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (affectedEntity === "") {
      setAffectedEntityError(true);
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

    if (agencyId === "" && affectedEntity === "agency") {
      setAgencyIdError(true);
      return;
    }

    if (routeId === "" && affectedEntity === "route") {
      setRouteIdError(true);
      return;
    }

    if (tripId === "" && affectedEntity === "trip") {
      setTripIdError(true);
      return;
    }

    if (message === "") {
      setMessageError(true);
      return;
    }

    // Handle form submission
    let data = undefined;
    try {
      data = await trigger({
        affected_entity: affectedEntity,
        route_id: routeId,
        trip_id: tripId,
        agency_id: agencyId,
        message: message,
        cause: cause,
        effect: effect,
        duration: duration,
        start_timestamp: startTimestamp.format("YYYY-MM-DDTHH:mm:ssZ"),
      }).unwrap();
      navigate("/");
      enqueueSnackbar("Report submitted successfully", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Error submitting report", { variant: "error" });
    }
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
                <MenuItem value="route">route</MenuItem>
                <MenuItem value="agency">agency</MenuItem>
                <MenuItem value="trip">trip</MenuItem>
              </Select>
            </FormControl>
            {
              // If affected entity is route, show route id
              affectedEntity === "route" ? (
                <FormControl>
                  <InputLabel>Route</InputLabel>
                  <Select
                    name="routeId"
                    label="Route"
                    value={routeId}
                    onChange={handleInputChange}
                    required
                  >
                    {routeList.map((route) => (
                      <MenuItem key={route.id} value={route.id}>
                        {route.route_short_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : affectedEntity === "agency" ? (
                <FormControl>
                  <InputLabel>Agency</InputLabel>
                  <Select
                    name="agencyId"
                    label="agencyId"
                    value={agencyId}
                    onChange={handleInputChange}
                    required
                    error={agencyIdError}
                  >
                    {agencyList.map((agency) => (
                      <MenuItem key={agency.id} value={agency.id}>
                        {agency.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : affectedEntity === "trip" ? (
                <FormControl>
                  <InputLabel>Trip</InputLabel>
                  <Select
                    name="tripId"
                    label="TripId"
                    value={tripId}
                    onChange={handleInputChange}
                    required
                    error={tripIdError}
                  >
                    {tripList.map((trip) => (
                      <MenuItem key={trip.id} value={trip.id}>
                        {trip.short_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <></>
              )
            }
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
                  <MenuItem value={cause[0]}>{cause[1]}</MenuItem>
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
                  <MenuItem value={effect[0]}>{effect[1]}</MenuItem>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                clearable
                ampm={false}
                label="Start Timestamp"
                value={startTimestamp}
                name="startTimestamp"
                onChange={(newValue) => {
                  setStartTimestamp(dayjs(newValue));
                }}
                required
                error={startTimestampError}
                helperText={
                  startTimestampError ? "Start Timestamp is required" : ""
                }
              />
            </LocalizationProvider>
            <TextField
              label="Message"
              value={message}
              name="message"
              multiline={true}
              minRows={3}
              maxRows={10}
              onChange={handleInputChange}
              required
              error={messageError}
              helperText={messageError ? "Message is required" : ""}
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
    </>
  );
};

export default Report;
