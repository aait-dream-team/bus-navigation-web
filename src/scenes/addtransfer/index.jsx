import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import Header from "components/Header";
import { useAddTransferMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const AddTransfer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [fromStop, setFromStop] = useState("");
  const [toStop, setToStop] = useState("");
  const [transferType, setTransferType] = useState("");
  const [minTransferTime, setMinTransferTime] = useState("");
  const [admin, setAdmin] = useState("");

  const [trigger] = useAddTransferMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    const transferData = {
      from_stop: fromStop,
      to_stop: toStop,
      transfer_type: transferType,
      min_transfer_time: minTransferTime,
      admin: admin,
    };

    try {
      await trigger(transferData).unwrap();
      navigate("/transfers"); // Redirect to the transfers page after successful submission
      enqueueSnackbar("Transfer successfully created!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error creating Transfer", { variant: "error" });
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box mt="2rem">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            mb="1rem"
          >
            <Header title="Add Transfer" />
          </Box>
          <form onSubmit={handleSubmit}>
            <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
              <TextField
                label="From Stop"
                value={fromStop}
                onChange={(event) => setFromStop(event.target.value)}
                required
              />
              <TextField
                label="To Stop"
                value={toStop}
                onChange={(event) => setToStop(event.target.value)}
                required
              />
              <TextField
                label="Transfer Type"
                value={transferType}
                onChange={(event) => setTransferType(event.target.value)}
                required
              />
              <TextField
                label="Min Transfer Time"
                value={minTransferTime}
                onChange={(event) => setMinTransferTime(event.target.value)}
                required
              />
              <TextField
                label="Admin"
                value={admin}
                onChange={(event) => setAdmin(event.target.value)}
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
        </Box>
      </Container>
    </>
  );
};

export default AddTransfer;
