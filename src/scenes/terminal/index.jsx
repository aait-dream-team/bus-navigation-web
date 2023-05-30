import React from "react";
import { Box, useTheme, Button, CircularProgress, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { useListOfTerminalsQuery } from "state/api";

const Terminal = () => {
  const theme = useTheme();
  const { data, isLoading } = useListOfTerminalsQuery();

  const columns = [
    {
      field: "stop_code",
      headerName: "Terminal Code",
      flex: 1,
    },
    {
      field: "stop_name",
      headerName: "Terminal Name",
      flex: 1,
    },
    {
      field: "stop_desc",
      headerName: "Terminal Description",
      flex: 1,
    },
    {
      field: "stop_lat",
      headerName: "Latitude",
      flex: 1,
    },
    {
      field: "stop_long",
      headerName: "Longitude",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Terminals" subtitle="List Of Terminals" />
        <Box>
          <Link to="/addTerminal">
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Add Terminal
            </Button>
          </Link>
        </Box>
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
            loading={isLoading}
            getRowId={(row) => row.stop_code}
            rows={data}
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default Terminal;
