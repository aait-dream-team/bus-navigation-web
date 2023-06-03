import React, { useEffect, useState } from "react";
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
import { useListOfRoutesQuery, useDeleteRouteMutation } from "state/api";

const AdminRoutes = () => {
  const theme = useTheme();
  const { data, isLoading } = useListOfRoutesQuery();
  const [deleteRouteTrigger, result] = useDeleteRouteMutation();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            sx={{
              color: "red",
              fontSize: "14px",
              fontWeight: "bold",
              borderColor: "red",
            }}
            size="small"
            onClick={(item) => {
              deleteRouteTrigger({ id: params.id });
              setRows(data.filter((obj) => obj.id !== params.id));
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Routes" subtitle="List Of Routes" />
        <Box>
          <Link to="/addroute">
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Add Route
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
            getRowId={(row) => row.id}
            rows={rows || []}
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default AdminRoutes;
