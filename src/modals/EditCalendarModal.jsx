import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  Alert,
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
import { usePatchCalendarMutation, useListOfAgenciesQuery } from "state/api";
import { enqueueSnackbar } from "notistack";

const EditCalendarModal = ({ row, rows, setRows, closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // dropdown list of agencies
  const { data: rowAgencyList, isLoading } = useListOfAgenciesQuery();
  const [agencyList, setAgencyList] = useState([]);
  useEffect(() => {
    if (rowAgencyList) {
      setAgencyList(rowAgencyList?.results || []);
    }
  }, [rowAgencyList]);

  const [monday, setMonday] = useState(row.monday);
  const [tuesday, setTuesday] = useState(row.tuesday);
  const [wednesday, setWednesday] = useState(row.wednesday);
  const [thursday, setThursday] = useState(row.thursday);
  const [friday, setFriday] = useState(row.friday);
  const [saturday, setSaturday] = useState(row.saturday);
  const [sunday, setSunday] = useState(row.sunday);
  const [startDate, setStartDate] = useState(row.start_date);
  const [endDate, setEndDate] = useState(row.end_date);
  const [agency, setAgency] = useState(row.agency);

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
      start_date: startDate,
      end_date: endDate,
      agency,
    };
    try {
      data = await trigger(newData).unwrap();
      closeModal();
      for (const item of rows) {
        if (item.id === row.id) {
          setRows([...rows.filter((item) => item.id !== row.id), newData]);
          enqueueSnackbar("Calender edited successfully.", {
            variant: "success",
          });
          return;
        }
      }
    } catch (e) {
      enqueueSnackbar("Error editing calendar.", { variant: "error" });
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
                value={dayjs(startDate)}
                onChange={(newValue) => {
                  setStartDate(dayjs(newValue).format("YYYY-MM-DD").toString());
                }}
                required
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                name="endDate"
                value={dayjs(endDate)}
                onChange={(newValue) => {
                  setEndDate(dayjs(newValue).format("YYYY-MM-DD").toString());
                }}
                required
              />
            </LocalizationProvider>
            <FormControl>
              <InputLabel>Agency</InputLabel>
              <Select
                name="agency"
                label="Agency"
                value={agency}
                onChange={handleInputChange}
                required
              >
                {agencyList.map((agency) => (
                  <MenuItem key={agency.id} value={agency.id}>
                    {agency.name}
                  </MenuItem>
                ))}
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

export default EditCalendarModal;
