import React, { useState } from "react";
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
import { usePatchCalendarDateMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const EditCalendarDateModal = ({ row, rows, setRows, closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [service, setService] = useState(row.service);
  const [serviceError, setServiceError] = useState(false);
  const [date, setDate] = useState(dayjs(row.date));
  const [dateError, setDateError] = useState(false);
  const [exceptionType, setExceptionType] = useState(row.exception_type);
  const [exceptionTypeError, setExceptionTypeError] = useState(false);

  const [trigger, result] = usePatchCalendarDateMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "service") {
      setService(value);
      setServiceError(false);
    }
    if (name === "date") {
      setDate(dayjs(value));
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
    if (exceptionType === "") {
      setExceptionTypeError(true);
      return;
    }

    let data = undefined;
    let newData = {
      id: row.id,
      service,
      date : date.format("YYYY-MM-DD").toString(),
      exception_type: exceptionType,
    };
    try {
      data = await trigger(newData).unwrap();
      closeModal();
      for (const item of rows) {
        if (item.id === row.id) {
          setRows([...rows.filter((item) => item.id !== row.id), newData]);
          enqueueSnackbar("Calender Date edited successfully.", {
            variant: "success",
          });
          return;
        }
      }
    } catch (e) {
      enqueueSnackbar("Error while editing Calender Date.", {
        variant: "error",
      });
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
                  setDate(dayjs(newValue));
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

export default EditCalendarDateModal;
