import React from "react";
import { Box, useTheme, Button, Container, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { useListOfAgenciesQuery } from "state/api";

const Network = () => {
  const theme = useTheme();
  const { data, isLoading } = useListOfAgenciesQuery();

  console.log(data);

  // const data = [
  //   {
  //     busNumber: "1",
  //     plateNumber: "ABC-123",
  //     driverName: "John Doe",
  //     dateAdded: "2021-10-10",
  //     rating: "4.5",
  //   },
  //   {
  //     busNumber: "2",
  //     plateNumber: "ABC-123",
  //     driverName: "John Doe",

  //     dateAdded: "2021-10-10",
  //     rating: "4.5",
  //   },
  // ];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Network Name",
      flex: 1,
    },
    {
      field: "url",
      headerName: "Network URL",
      flex: 1,
    },
    {
      field: "lang",
      headerName: "Language",
      flex: 1,
    },
    {
      field: "time_zone",
      headerName: "Time Zone",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Networks" subtitle="List Of Networks" />
        {/* <Box>
          <Link to="/addNetwork">
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Add Network
            </Button>
          </Link>
        </Box> */}
      </FlexBetween>
      <Box
        mt="40px"
        width="82vw"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
            overflow: "hidden",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {isLoading ? (
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "inherit",
            }}
          >
            <CircularProgress />
          </Container>
        ) : (
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
        />
        )}
      </Box>
    </Box>
  );
};

export default Network;
