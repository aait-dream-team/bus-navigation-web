import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  Container,
  CircularProgress,
  Modal,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { useListTripsQuery, useDeleteTripMutation } from "state/api";
import { Link } from "react-router-dom";
import EditTripModal from "modals/EditTripModal";
import { enqueueSnackbar } from "notistack";

const Trips = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const { data, isLoading, refetch } = useListTripsQuery({ page: page + 1});
  const [deleteTripTrigger, result] = useDeleteTripMutation();
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setRows(data?.results || []);
  }, [data]);

  const columns = [
    {
      field: "headsign",
      headerName: "Headsign",
      flex: 1,
    },
    {
      field: "short_name",
      headerName: "Short Name",
      flex: 1,
    },
    {
      field: "direction",
      headerName: "Direction",
      flex: 1,
    },
    {
      field: "agency",
      headerName: "Agency",
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
              fontSize: "14px",
              fontWeight: "bold",
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              marginRight: "10px",
            }}
            size="small"
            onClick={() => {
              setSelectedRow(params.row);
              handleOpen();
            }}
          >
            Edit
          </Button>
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
              deleteTripTrigger({ id: params.id });
              setRows(rows.filter((obj) => obj.id !== params.id));
              enqueueSnackbar('Trip deleted successfully!', { variant: 'success' })
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="Trips" subtitle="List of Trips" />
          <Box>
            <Link to="/addtrip">
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                Add Trip
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50vw",
            height: "90vh",
            bgcolor: theme.palette.primary[600],
            boxShadow: 24,
            p: 4,
          }}
        >
          <EditTripModal
            row={selectedRow}
            rows={rows}
            setRows={setRows}
            closeModal={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Trips;
