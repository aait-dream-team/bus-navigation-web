import React, { useState } from "react";
import { TextField, Button, Box, Container, useTheme } from "@mui/material";
import Header from "components/Header";

const AddRoute = () => {
  const theme = useTheme();

  const [busNumber, setBusNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [rating, setRating] = useState("");
  const [terminals, setTerminals] = useState([]);

  const handleTerminalChange = (index, event) => {
    const newTerminals = [...terminals];
    newTerminals[index] = event.target.value;
    setTerminals(newTerminals);
  };

  const handleAddTerminal = () => {
    setTerminals((prevTerminals) => [...prevTerminals, ""]);
  };

  const handleRemoveLastTerminal = () => {
    setTerminals((prevTerminals) =>
      [...prevTerminals].slice(0, prevTerminals.length - 1)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(terminals);
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
          flexDirection : "row",
          justifyContent : "center"
        }}
        mb="1rem"
      >
        <Header title="Add Route" />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
          <TextField
            label="Bus Number"
            value={busNumber}
            onChange={(event) => setBusNumber(event.target.value)}
            required
          />
          <TextField
            label="Plate Number"
            value={plateNumber}
            onChange={(event) => setPlateNumber(event.target.value)}
            required
          />
          <TextField
            label="Driver Name"
            value={driverName}
            onChange={(event) => setDriverName(event.target.value)}
            required
          />
          <TextField
            label="Date Added"
            value={dateAdded}
            onChange={(event) => setDateAdded(event.target.value)}
            required
          />
          <TextField
            label="Rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            required
          />
          {terminals.map((terminal, index) => (
            <TextField
              label={`Terminal ${index + 1}`}
              key={`${index}`}
              value={terminal}
              onChange={(event) => handleTerminalChange(index, event)}
              required
            />
          ))}
        </Box>
        <Box
          display="grid"
          justifyContent="center"
          gridTemplateColumns={
            terminals.length === 0 ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
          }
          gap={2}
          mt="2rem"
        >
          {terminals.length !== 0 && (
            <Button
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              type="button"
              variant="outlined"
              onClick={handleRemoveLastTerminal}
            >
              Remove Last Terminal
            </Button>
          )}
          <Button
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            type="button"
            variant="outlined"
            onClick={handleAddTerminal}
          >
            Add Terminal
          </Button>
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

export default AddRoute;
