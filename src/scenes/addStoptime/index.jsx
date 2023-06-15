import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Container,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "components/Header";
import {
  useCreateStopTimeMutation,
  useListOfAgenciesQuery,
  useListTripsQuery,
  useListOfTerminalsQuery,
} from "state/api";
import { enqueueSnackbar } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const AddStopTime = () => {
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

  // dropdown list of trips
  const { data: rawTripList, isLoading: isTripListLoading } =
    useListTripsQuery();
  const [tripList, setTripList] = useState([]);
  useEffect(() => {
    if (rawTripList) {
      setTripList(rawTripList);
    }
  }, [rawTripList]);

  // dropdown list of terminals
  const {data : rawStops, isLoading: isStopListLoading} = useListOfTerminalsQuery();
  const [stopList, setStopList] = useState([]);
  useEffect(() => {
    if (rawStops) {
      setStopList(rawStops);
    }
  }, [rawStops]);

  const [arrivalTime, setArrivalTime] = useState("");
  const [arrivalTimeError, setArrivalTimeError] = useState(false);
  const [departureTime, setDepartureTime] = useState("");
  const [departureTimeError, setDepartureTimeError] = useState(false);
  const [stopSequence, setStopSequence] = useState("");
  const [stopSequenceError, setStopSequenceError] = useState(false);
  const [stopHeadsign, setStopHeadsign] = useState("");
  const [stopHeadsignError, setStopHeadsignError] = useState(false);
  const [agency, setAgency] = useState("");
  const [agencyError, setAgencyError] = useState(false);
  const [trip, setTrip] = useState("");
  const [tripError, setTripError] = useState(false);
  const [stop, setStop] = useState("");
  const [stopError, setStopError] = useState(false);

  const [trigger, result] = useCreateStopTimeMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "arrivalTime") {
      setArrivalTime(value);
      setArrivalTimeError(false);
    }
    if (name === "departureTime") {
      setDepartureTime(value);
      setDepartureTimeError(false);
    }
    if (name === "stopSequence") {
      setStopSequence(value);
      setStopSequenceError(false);
    }
    if (name === "stopHeadsign") {
      setStopHeadsign(value);
      setStopHeadsignError(false);
    }
    if (name === "agency") {
      setAgency(value);
      setAgencyError(false);
    }
    if (name === "trip") {
      console.log(name);
      setTrip(value);
      setTripError(false);
    }
    if (name === "stop") {
      setStop(value);
      setStopError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (arrivalTime === "") {
      setArrivalTimeError(true);
      return;
    }
    if (departureTime === "") {
      setDepartureTimeError(true);
      return;
    }
    if (stopSequence === "") {
      setStopSequenceError(true);
      return;
    }
    if (stopHeadsign === "") {
      setStopHeadsignError(true);
      return;
    }
    if (agency === "") {
      setAgencyError(true);
      return;
    }
    if (trip === "") {
      setTripError(true);
      return;
    }
    if (stop === "") {
      setStopError(true);
      return;
    }

    let data = undefined;
    try {
      data = await trigger({
        arrival_time: arrivalTime.format("hh:mm"),
        departure_time: departureTime.format("hh:mm"),
        stop_sequence: stopSequence,
        stop_headsign: stopHeadsign,
        agency,
        trip,
        stop,
      }).unwrap();
      navigate("/stoptime");
      enqueueSnackbar("Terminal successfully created!", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Error creating Terminal", { variant: "error" });
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
          <Header title="Add StopTime" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                clearable
                ampm={false}
                label="arrival time"
                name="arrivalTime"
                value={arrivalTime}
                onChange={(newValue) => {
                  setArrivalTime(dayjs(newValue));
                }}
                required
                error={arrivalTimeError}
                helperText={arrivalTimeError ? "Arrival time is required" : ""}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                clearable
                ampm={false}
                label="Departure Time"
                name="departureTime"
                value={departureTime}
                onChange={(newValue) => {
                  setDepartureTime(dayjs(newValue));
                }}
                required
                error={departureTimeError}
                helperText={
                  departureTimeError ? "Departure time is required" : ""
                }
              />
            </LocalizationProvider>
            <TextField
              label="Stop Sequence"
              name="stopSequence"
              value={stopSequence}
              onChange={handleInputChange}
              required
              error={stopSequenceError}
              helperText={stopSequenceError ? "stop sequence is required" : ""}
            />
            <TextField
              label="Stop Headsign"
              name="stopHeadsign"
              value={stopHeadsign}
              onChange={handleInputChange}
              required
              error={stopHeadsignError}
              helperText={stopHeadsignError ? "stop headsign is required" : ""}
            />
            <FormControl>
              <InputLabel>Agency</InputLabel>
              <Select
                name="agency"
                label="Agency"
                value={agency}
                onChange={handleInputChange}
                required
                error={agencyError}
              >
                {agencyList.map((agency) => (
                  <MenuItem key={agency.id} value={agency.id}>
                    {agency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Trip</InputLabel>
              <Select
                name="trip"
                label="Trip"
                value={trip}
                onChange={handleInputChange}
                required
                error={tripError}
              >
                {
                  tripList.map((trip) => (
                    <MenuItem key={trip.id} value={trip.id}>
                      {trip.short_name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Terminal</InputLabel>
              <Select
                name="stop"
                label="stop"
                value={stop}
                onChange={handleInputChange}
                required
                error={stopError}
              >
                {
                  stopList.map((stop) => (
                    <MenuItem key={stop.id} value={stop.id}>
                      {stop.stop_name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
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

export default AddStopTime;
