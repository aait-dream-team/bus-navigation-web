import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";

const SuperAdminRoutes = () => {
  const theme = useTheme();
  // const { data, isLoading } = {};

  const data = [
    {
      busNumber: "1",
      plateNumber: "ABC-123",
      driverName: "John Doe",
      dateAdded: "2021-10-10",
      rating: "4.5",
    },
    {
      busNumber: "2",
      plateNumber: "ABC-123",
      driverName: "John Doe",

      dateAdded: "2021-10-10",
      rating: "4.5",
    },
  ];

  const columns = [
    {
      field: "busNumber",
      headerName: "Bus Number",
      flex: 1,
    },
    {
      field: "plateNumber",
      headerName: "Plate Number",
      flex: 1,
    },
    {
      field: "driverName",
      headerName: "Driver Name",
      flex: 1,
    },
    {
      field: "dateAdded",
      headerName: "Date Added",
      flex: 1,
      renderCell: (params) => {
        return params.value?.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.4,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Routes"
        subtitle="List Of Routes"
      />
      <Box
        mt="40px"
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
        <DataGrid
          // loading={isLoading || !data}
          getRowId={(row) => row.busNumber}
          rows={data || []}
          columns={columns}
        />
        {/* <DataGrid loading={true} rows={[]} columns={columns} /> */}
      </Box>
    </Box>
  );
};

export default SuperAdminRoutes;
