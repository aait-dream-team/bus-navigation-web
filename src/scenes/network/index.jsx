import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { useListOfAgenciesQuery, useDeleteAgencyMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const Network = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const { data, isLoading, refetch } = useListOfAgenciesQuery({ page: page + 1});
  const [deleteNetworkTrigger, result] = useDeleteAgencyMutation();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(data?.results || []);
  }, [data]);

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
              deleteNetworkTrigger({ id: params.id });
              setRows(rows.filter((obj) => obj.id !== params.id));
              enqueueSnackbar("Network successfully deleted!", {
                variant: "error",
              });
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
        <Header title="Networks" subtitle="List Of Networks" />
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
              rows={rows || []}
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

export default Network;
