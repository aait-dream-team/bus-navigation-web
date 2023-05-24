import React, { useState } from "react";
import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import Header from "components/Header";

const AddTerminal = () => {
  const theme = useTheme();

  const [terminalNumber, setTerminalNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [terminalName, setTerminalName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(terminalName, terminalNumber, branch, longitude, latitude);
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
        <Header title="Add Terminal" />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
          <TextField
            label="Terminal Number"
            value={terminalNumber}
            onChange={(event) => setTerminalNumber(event.target.value)}
            required
          />
          <TextField
            label="Branch"
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
            required
          />
          <TextField
            label="Terminal Name"
            value={terminalName}
            onChange={(event) => setTerminalName(event.target.value)}
            required
          />
          <TextField
            label="Latitude"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            required
          />
          <TextField
            label="Longitude"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
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

export default AddTerminal;
