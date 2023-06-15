import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "components/Header";
import { useCreateCalendarDateMutation, useListCalendarQuery } from "state/api";
import { enqueueSnackbar } from "notistack";

const AddCalendarDate = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // dropdown list of calendar
  const { data: rawCalendarList, isLoading } = useListCalendarQuery();
  const [calendarList, setCalendarList] = useState([]);
  useEffect(() => {
    if (rawCalendarList) {
      setCalendarList(rawCalendarList);
    }
  }, [rawCalendarList]);

  const [service, setService] = useState("");
  const [serviceError, setServiceError] = useState(false);
  const [date, setDate] = useState(dayjs("2021-10-01"));
  const [dateError, setDateError] = useState(false);
  const [exceptionType, setExceptionType] = useState("");
  const [exceptionTypeError, setExceptionTypeError] = useState(false);

  const [trigger, result] = useCreateCalendarDateMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "service") {
      setService(value);
      setServiceError(false);
    }
    if (name === "date") {
      console.log(value);
      setDateError(false);
    }
    if (name === "exceptionType") {
      setExceptionType(value);
      setExceptionTypeError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (service === "") {
      setServiceError(true);
      return;
    }
    if (date === "") {
      setDateError(true);
      return;
    }
    if (exceptionType === "") {
      setExceptionTypeError(true);
      return;
    }

    try {
      await trigger({
        service,
        date : date.format("YYYY-MM-DD").toString(),
        exception_type: exceptionType,
      }).unwrap();
      navigate("/calendardates");
      enqueueSnackbar("Calendar date created", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Error creating calendar date", { variant: "error" });
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
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
          <Header title="Add Calendar Date" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <FormControl>
              <InputLabel>Service</InputLabel>
              <Select
                name="service"
                label="Service"
                value={service}
                onChange={handleInputChange}
                required
                error={serviceError}
              >
                {calendarList.map((calendar) => (
                  <MenuItem key={calendar.id} value={calendar.id}>
                    {calendar.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                name="date"
                value={date}
                onChange={(newValue) => {
                  setDate(dayjs(newValue));
                }}
                error={dateError}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel id="exception-type-label">Exception Type</InputLabel>
              <Select
                labelId="exception-type-label"
                id="exception-type"
                label="Exception Type"
                value={exceptionType}
                name="exceptionType"
                onChange={handleInputChange}
                error={exceptionTypeError}
              >
                <MenuItem value="a">Added</MenuItem>
                <MenuItem value="r">Removed</MenuItem>
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
              type="submit"
              variant="outlined"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddCalendarDate;
