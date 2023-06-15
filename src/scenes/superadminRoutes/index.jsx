import React from "react";
import {
  Box,
  useTheme,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { useListOfRoutesQuery } from "state/api";

const SuperAdminRoutes = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const { data, isLoading, refetch } = useListOfRoutesQuery({ page: page + 1 });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "route_short_name",
      headerName: "Route Short Name",
      flex: 1,
    },
    {
      field: "agency_id",
      headerName: "Agency ID",
      flex: 1,
    },
    {
      field: "route_color",
      headerName: "Route Color",
      flex: 1,
    },
    {
      field: "route_desc",
      headerName: "Route Desc",
      flex: 1,
    },
    {
      field: "route_type",
      headerName: "Route Type",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Routes" subtitle="List Of Routes" />
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
            getRowId={(row) => row.id}
            rows={data?.results || []}
            columns={columns}
            rowCount={(data && data.count) || 0}
            paginationModel={{ page, pageSize: 100 }}
            paginationMode="server"
            onPaginationModelChange={({ page }) => {
              setPage(page);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SuperAdminRoutes;
