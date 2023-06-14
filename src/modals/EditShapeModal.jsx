import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import Header from "components/Header";
import { useUpdateShapeMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const EditShapeModal = ({ row, rows, setRows, closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [shapePtLat, setShapePtLat] = useState(row.shape_pt_lat);
  const [shapePtLatError, setShapePtLatError] = useState(false);
  const [shapePtLon, setShapePtLon] = useState(row.shape_pt_lon);
  const [shapePtLonError, setShapePtLonError] = useState(false);
  const [shapePtSequence, setShapePtSequence] = useState(row.shape_pt_sequence);
  const [shapePtSequenceError, setShapePtSequenceError] = useState(false);
  const [shapeDistTraveled, setShapeDistTraveled] = useState(
    row.shape_dist_traveled
  );
  const [shapeDistTraveledError, setShapeDistTraveledError] = useState(false);

  const [trigger, result] = useUpdateShapeMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "shapePtLat") {
      setShapePtLat(value);
      setShapePtLatError(false);
    }
    if (name === "shapePtLon") {
      setShapePtLon(value);
      setShapePtLonError(false);
    }
    if (name === "shapePtSequence") {
      setShapePtSequence(value);
      setShapePtSequenceError(false);
    }
    if (name === "shapeDistTraveled") {
      setShapeDistTraveled(value);
      setShapeDistTraveledError(false);
    }
  };

  const handleSubmit = async (event) => {
    if (shapePtLat === "") {
      setShapePtLatError(true);
      return;
    }
    if (shapePtLon === "") {
      setShapePtLonError(true);
      return;
    }
    if (shapePtSequence === "") {
      setShapePtSequenceError(true);
      return;
    }
    if (shapeDistTraveled === "") {
      setShapeDistTraveledError(true);
      return;
    }

    let data = undefined;
    const newData = {
      id: row.id,
      shape_pt_lat: shapePtLat,
      shape_pt_lon: shapePtLon,
      shape_pt_sequence: shapePtSequence,
      shape_dist_traveled: shapeDistTraveled,
    };
    try {
      console.log(row);
      data = await trigger(newData).unwrap();
      for (const item of rows) {
        if (item.id === row.id) {
          setRows([...rows.filter((item) => item.id !== row.id), newData]);
          enqueueSnackbar("Shape successfully created!", {
            variant: "success",
          });
          closeModal();
          return;
        }
      }
    } catch (e) {
      enqueueSnackbar("Error creating Shape", { variant: "error" });
    }
  };

  return (
    <>
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
          <Header title="Edit Shape" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <TextField
              label="Shape Point Latitude"
              name="shapePtLat"
              value={shapePtLat}
              onChange={handleInputChange}
              required
              error={shapePtLatError}
              helperText={
                shapePtLatError ? "Shape Point Latitude is required" : ""
              }
            />
            <TextField
              label="Shape Point Longitude"
              name="shapePtLon"
              value={shapePtLon}
              onChange={handleInputChange}
              required
              error={shapePtLonError}
              helperText={
                shapePtLonError ? "Shape Point Longitude is required" : ""
              }
            />
            <TextField
              label="Shape Point Sequence"
              name="shapePtSequence"
              value={shapePtSequence}
              onChange={handleInputChange}
              required
              error={shapePtSequenceError}
              helperText={
                shapePtSequenceError ? "Shape Point Sequence is required" : ""
              }
            />
            <TextField
              label="Shape Distance Traveled"
              name="shapeDistTraveled"
              value={shapeDistTraveled}
              onChange={handleInputChange}
              required
              error={shapeDistTraveledError}
              helperText={
                shapeDistTraveledError
                  ? "Shape Distance Traveled is required"
                  : ""
              }
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

export default EditShapeModal;
