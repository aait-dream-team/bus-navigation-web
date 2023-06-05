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
} from "@mui/material";
import Header from "components/Header";
import { usePatchFareMutation } from "state/api";

const EditFareModal = ({ row, rows, setRows, closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [price, setPrice] = useState(row.price);
  const [agency, setAgency] = useState(row.agency);
  const [route, setRoute] = useState(row.route);
  const [startStop, setStartStop] = useState(row.start_stop);
  const [endStop, setEndStop] = useState(row.end_stop);

  const [open, setOpen] = useState(false); // snackbar state

  const [trigger, result] = usePatchFareMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    let data = undefined;
    const newData = {
      id: row.id,
      price: price,
      agency: agency,
      route: route,
      start_stop: startStop,
      end_stop: endStop,
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
          <Header title="Add Fare" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <TextField
              label="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
            <TextField
              label="Agency"
              value={agency}
              onChange={(event) => setAgency(event.target.value)}
              required
            />
            <TextField
              label="Route"
              value={route}
              onChange={(event) => setRoute(event.target.value)}
              required
            />
            <TextField
              label="Start Stop"
              value={startStop}
              onChange={(event) => setStartStop(event.target.value)}
              required
            />
            <TextField
              label="End Stop"
              value={endStop}
              onChange={(event) => setEndStop(event.target.value)}
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
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditFareModal;
