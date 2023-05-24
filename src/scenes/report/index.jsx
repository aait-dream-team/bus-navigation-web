import React, { useState } from "react";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Header from "components/Header";

const Report = () => {
  const theme = useTheme();

  const [busNumber, setBusNumber] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(busNumber, reportType, reportDescription);
    // Handle form submission
  };

  return (
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
          <TextField
            label="Bus Number"
            value={busNumber}
            onChange={(event) => setBusNumber(event.target.value)}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Report Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reportType}
              label="Report Type"
              onChange={(event) => setReportType(event.target.value)}
            >
              <MenuItem value="Time delay">Time Delay</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Description"
            value={reportDescription}
            onChange={(event) => setReportDescription(event.target.value)}
            required
            multiline={true}
            minRows={3}
            maxRows={10}
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
  );
};

export default Report;
