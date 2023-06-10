import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import Header from "components/Header";
import { useCreateTripMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const AddTrip = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [headsign, setHeadsign] = useState("");
  const [shortName, setShortName] = useState("");
  const [direction, setDirection] = useState("");
  const [agency, setAgency] = useState("");

  const [trigger, result] = useCreateTripMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    let data = undefined;
    try {
      data = await trigger({
        headsign: headsign,
        short_name: shortName,
        direction: direction,
        agency: agency,
      }).unwrap();
      navigate("/trips");
      enqueueSnackbar("Trip successfully created!", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Error creating Trip", { variant: "error" });
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
          <Header title="Add Trip" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <TextField
              label="Headsign"
              value={headsign}
              onChange={(event) => setHeadsign(event.target.value)}
              required
            />
            <TextField
              label="Short Name"
              value={shortName}
              onChange={(event) => setShortName(event.target.value)}
              required
            />
            <TextField
              label="Direction"
              value={direction}
              onChange={(event) => setDirection(event.target.value)}
              required
            />
            <TextField
              label="Agency"
              value={agency}
              onChange={(event) => setAgency(event.target.value)}
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
    </>
  );
};

export default AddTrip;
