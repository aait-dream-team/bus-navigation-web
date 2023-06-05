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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "components/Header";
import { usePatchCalendarMutation } from "state/api";

const EditCalendarModal = ({ row, rows, setRows, closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [monday, setMonday] = useState(row.monday);
  const [tuesday, setTuesday] = useState(row.tuesday);
  const [wednesday, setWednesday] = useState(row.wednesday);
  const [thursday, setThursday] = useState(row.thursday);
  const [friday, setFriday] = useState(row.friday);
  const [saturday, setSaturday] = useState(row.saturday);
  const [sunday, setSunday] = useState(row.sunday);
  const [startDate, setStartDate] = useState(dayjs(row.start_date));
  const [endDate, setEndDate] = useState(dayjs(row.end_date));
  const [agency, setAgency] = useState(row.agency);

  const [open, setOpen] = useState(false); // snackbar state

  const [trigger, result] = usePatchCalendarMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    }
    if (name === "endDate") {
      setEndDate(value);
    }
    if (name === "agency") {
      setAgency(value);
    }
  };

  const handleDayChange = (event) => {
    const { name, value } = event.target;
    if (name === "monday") {
      setMonday(value === "true");
    }
    if (name === "tuesday") {
      setTuesday(value === "true");
    }
    if (name === "wednesday") {
      setWednesday(value === "true");
    }
    if (name === "thursday") {
      setThursday(value === "true");
    }
    if (name === "friday") {
      setFriday(value === "true");
    }
    if (name === "saturday") {
      setSaturday(value === "true");
    }
    if (name === "sunday") {
      setSunday(value === "true");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = undefined;
    const newData = {
      id: row.id,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      start_date: startDate.format("YYYY-MM-DD").toString(),
      end_date: endDate.format("YYYY-MM-DD").toString(),
      agency,
    };
    try {
      data = await trigger(newData).unwrap();
      closeModal();
      for (const item of rows) {
        if (item.id === row.id) {
          setRows([...rows.filter((item) => item.id !== row.id), newData]);
          return;
        }
      }
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
          <Header title="Edit Calendar" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <FormControl>
              <InputLabel>Monday</InputLabel>
              <Select
                name="monday"
                label="Monday"
                value={monday ? "true" : "false"}
                onChange={handleDayChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Tuesday</InputLabel>
              <Select
                name="tuesday"
                label="Tuesday"
                value={tuesday ? "true" : "false"}
                onChange={handleDayChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Wednesday</InputLabel>
              <Select
                name="wednesday"
                label="Wednesday"
                value={wednesday ? "true" : "false"}
                onChange={handleDayChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Thursday</InputLabel>
              <Select
                name="thursday"
                label="Thursday"
                value={thursday ? "true" : "false"}
                onChange={handleDayChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Friday</InputLabel>
              <Select
                name="friday"
                label="Friday"
                value={friday ? "true" : "false"}
                onChange={handleDayChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Saturday</InputLabel>
              <Select
                name="saturday"
                label="Saturday"
                value={saturday ? "true" : "false"}
                onChange={handleDayChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Sunday</InputLabel>
              <Select
                name="sunday"
                label="Sunday"
                value={sunday ? "true" : "false"}
                onChange={handleDayChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                name="startDate"
                value={startDate}
                onChange={handleInputChange}
                required
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                name="endDate"
                value={endDate}
                onChange={handleInputChange}
                required
              />
            </LocalizationProvider>
            <TextField
              label="Agency"
              name="agency"
              value={agency}
              onChange={handleInputChange}
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

export default EditCalendarModal;
