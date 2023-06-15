import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Container,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "components/Header";
import { usePatchRouteMutation, useListOfAgenciesQuery } from "state/api";
import { enqueueSnackbar } from "notistack";

const EditRouteModal = ({ row, rows, setRows, closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

    // dropdown list of agencies
    const { data: rowAgencyList, isLoading } = useListOfAgenciesQuery();
    const [agencyList, setAgencyList] = useState([]);
    useEffect(() => {
      if (rowAgencyList) {
        setAgencyList(rowAgencyList);
      }
    }, [rowAgencyList]);

  const [routeShortName, setRouteShortName] = useState(row.route_short_name);
  const [routeShortNameError, setRouteShortNameError] = useState(false);
  const [routeLongName, setRouteLongName] = useState(row.route_long_name);
  const [routeLongNameError, setRouteLongNameError] = useState(false);
  const [routeDesc, setRouteDesc] = useState(row.route_desc);
  const [routeDescError, setRouteDescError] = useState(false);
  const [routeColor, setRouteColor] = useState(row.route_color);
  const [routeColorError, setRouteColorError] = useState(false);
  const [agency, setAgency] = useState(row.agency);
  const [agencyError, setAgencyError] = useState(false);

  const [trigger, result] = usePatchRouteMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "routeShortName") {
      setRouteShortName(value);
      setRouteShortNameError(false);
    }
    if (name === "routeLongName") {
      setRouteLongName(value);
      setRouteLongNameError(false);
    }
    if (name === "routeDesc") {
      setRouteDesc(value);
      setRouteDescError(false);
    }
    if (name === "routeColor") {
      setRouteColor(value);
      setRouteColorError(false);
    }
    if (name === "agency") {
      setAgency(value);
      setAgencyError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission

    if (routeShortName === "") {
      setRouteShortNameError(true);
      return;
    }
    if (routeLongName === "") {
      setRouteLongNameError(true);
      return;
    }
    if (routeDesc === "") {
      setRouteDescError(true);
      return;
    }
    if (routeColor === "") {
      setRouteColorError(true);
      return;
    }
    if (agency === "") {
      setAgencyError(true);
      return;
    }

    let data = undefined;
    const newData = {
      id: row.id,
      route_short_name: routeShortName,
      route_long_name: routeLongName,
      route_desc: routeDesc,
      route_type: "car",
      route_color: routeColor,
      agency: agency,
    };
    try {
      data = await trigger(newData).unwrap();
      closeModal();
      for (const item of rows) {
        if (item.id === row.id) {
          setRows([...rows.filter((item) => item.id !== row.id), newData]);
          enqueueSnackbar("Route edited successfully.", {
            variant: "success",
          });
          return;
        }
      }
    } catch (e) {
      enqueueSnackbar("Error editing Route.", { variant: "error" });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
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
          <Header title="Edit Route" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <TextField
              label="Route Short Name"
              name="routeShortName"
              value={routeShortName}
              onChange={handleInputChange}
              required
              error={routeShortNameError}
              helperText={
                routeShortNameError ? "Route short name is required" : ""
              }
            />
            <TextField
              label="Route Long Name"
              name="routeLongName"
              value={routeLongName}
              onChange={handleInputChange}
              required
              error={routeLongNameError}
              helperText={
                routeLongNameError ? "Route long name is required" : ""
              }
            />
            <TextField
              label="Route Description"
              name="routeDesc"
              value={routeDesc}
              onChange={handleInputChange}
              required
              multiline={true}
              minRows={3}
              maxRows={10}
              error={routeDescError}
              helperText={routeDescError ? "Route description is required" : ""}
            />
            <TextField
              label="Route Color"
              name="routeColor"
              value={routeColor}
              onChange={handleInputChange}
              required
              error={routeColorError}
              helperText={routeColorError ? "Route color is required" : ""}
            />
            <FormControl>
              <InputLabel>Agency</InputLabel>
              <Select
                name="agency"
                label="Agency"
                value={agency}
                onChange={handleInputChange}
                required
                error={agencyError}
              >
                {agencyList.map((agency) => (
                  <MenuItem key={agency.id} value={agency.id}> 
                    {agency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: "1.5rem",
            }}
          >
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
          </Container>
        </form>
      </Container>
    </>
  );
};

export default EditRouteModal;
