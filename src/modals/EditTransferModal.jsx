import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import Header from "components/Header";
import { usePatchTransferMutation } from "state/api";

const EditTransferModal = ({ row, rows, setRows, closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [fromStop, setFromStop] = useState(row.from_stop);
  const [toStop, setToStop] = useState(row.to_stop);
  const [transferType, setTransferType] = useState(row.transfer_type);
  const [minTransferTime, setMinTransferTime] = useState(row.min_transfer_time);
  const [admin, setAdmin] = useState(row.admin);

  const [open, setOpen] = useState(false); // snackbar state

  const [trigger] = usePatchTransferMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    let data = undefined;
    const newData = {
      id: row.id,
      from_stop: fromStop,
      to_stop: toStop,
      transfer_type: transferType,
      min_transfer_time: minTransferTime,
      admin: admin,
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
    } catch (error) {
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
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong please make sure the inputs are correct.
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditTransferModal;
