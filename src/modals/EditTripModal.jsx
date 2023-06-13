import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import Header from "components/Header";
import { usePatchTripMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const EditTripModal = ({ row, rows, setRows, closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [headsign, setHeadsign] = useState(row.headsign);
  const [shortName, setShortName] = useState(row.short_name);
  const [direction, setDirection] = useState(row.direction);
  const [agency, setAgency] = useState(row.agency);
  const [shape, setShape] = useState(row.shape);
  const [route, setRoute] = useState(row.route);

  const [trigger, result] = usePatchTripMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    let data = undefined;
    const newData = {
      id: row.id,
      headsign: headsign,
      short_name: shortName,
      direction: direction,
      agency: agency,
      shape: shape,
      route: route,
    };
    try {
      data = await trigger(newData).unwrap();
      closeModal();
      for (const item of rows) {
        if (item.id === row.id) {
          setRows([...rows.filter((item) => item.id !== row.id), newData]);
          enqueueSnackbar("Trip edited successfully.", {
            variant: "success",
          });
          return;
        }
      }
    } catch (e) {
      enqueueSnackbar("Error editing trip.", {
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
              label="Agency Id"
              value={agency}
              onChange={(event) => setAgency(event.target.value)}
              required
            />
            <TextField
              label="Route Id"
              value={route}
              onChange={(event) => setRoute(event.target.value)}
              required
            />
            <TextField
              label="Shape Id"
              value={shape}
              onChange={(event) => setShape(event.target.value)}
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

export default EditTripModal;
