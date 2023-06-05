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
import { useCreateCalendarDateMutation } from "state/api";

const AddCalendarDate = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [serviceError, setServiceError] = useState(false);
  const [date, setDate] = useState(dayjs("2021-10-01"));
  const [dateError, setDateError] = useState(false);
  const [exceptionType, setExceptionType] = useState("");
  const [exceptionTypeError, setExceptionTypeError] = useState(false);

  const [open, setOpen] = useState(false); // snackbar state

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
        date,
        exception_type: exceptionType,
      }).unwrap();
      navigate("/calendardates");
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
            <TextField
              label="Service"
              name="service"
              value={service}
              onChange={handleInputChange}
              error={serviceError}
              helperText={serviceError ? "Service is required" : ""}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                name="date"
                value={date}
                onChange={(newValue) => {
                  setDate(dayjs(newValue).format("YYYY-MM-DD").toString());
                }}
                error={dateError}
                helperText={dateError ? "Date is required" : ""}
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
                helperText={
                  exceptionTypeError ? "Exception type is required" : ""
                }
              >
                <MenuItem value="Added">Added</MenuItem>
                <MenuItem value="Removed">Removed</MenuItem>
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
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong. Please make sure the inputs are correct.
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCalendarDate;