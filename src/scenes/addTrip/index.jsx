import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "components/Header";
import {
  useCreateTripMutation,
  useListOfAgenciesQuery,
  useListOfRoutesQuery,
  useListOfShapesQuery,
} from "state/api";
import { enqueueSnackbar } from "notistack";

const AddTrip = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // dropdown list of agencies
  const { data: rawAgencyList, isLoading: isAgencyListLoading } =
    useListOfAgenciesQuery();
  const [agencyList, setAgencyList] = useState([]);
  useEffect(() => {
    if (rawAgencyList) {
      setAgencyList(rawAgencyList);
    }
  }, [rawAgencyList]);

  // dropdown list of routes
  const { data: rawRouteList, isLoading: isRouteListLoading } =
    useListOfRoutesQuery();
  const [routeList, setRouteList] = useState([]);
  useEffect(() => {
    if (rawRouteList) {
      setRouteList(rawRouteList);
    }
  }, [rawRouteList]);

  // dropdown list of shapes
  const { data: rawShapeList, isLoading: isShapeListLoading } =
    useListOfShapesQuery();
  const [shapeList, setShapeList] = useState([]);
  useEffect(() => {
    if (rawShapeList) {
      setShapeList(rawShapeList);
    }
  }, [rawShapeList]);

  const [headsign, setHeadsign] = useState("");
  const [shortName, setShortName] = useState("");
  const [direction, setDirection] = useState("");
  const [agency, setAgency] = useState("");
  const [shape, setShape] = useState("");
  const [route, setRoute] = useState("");

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
        shape: shape,
        route: route,
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
            <FormControl>
              <InputLabel>Direction</InputLabel>
              <Select
                name="direction"
                label="Direction"
                value={direction}
                onChange={(event) => setDirection(event.target.value)}
                required
              >
                <MenuItem value="true">Outbound</MenuItem>
                <MenuItem value="false">Inbound</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Agency</InputLabel>
              <Select
                name="agency"
                label="Agency"
                value={agency}
                onChange={(event) => setAgency(event.target.value)}
                required
              >
                {agencyList.map((agency) => (
                  <MenuItem key={agency.id} value={agency.id}>
                    {agency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Route</InputLabel>
              <Select
                name="route"
                label="Route"
                value={route}
                onChange={(event) => setRoute(event.target.value)}
                required
              >
                {routeList.map((route) => (
                  <MenuItem key={route.id} value={route.id}>
                    {route.route_short_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Shape</InputLabel>
              <Select
                name="shape"
                label="Shape"
                value={shape}
                onChange={(event) => setShape(event.target.value)}
                required
              >
                {shapeList.map((shape) => (
                  <MenuItem key={shape.id} value={shape.id}>
                    {shape.id}
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
