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
import { useListCalendarQuery, useDeleteCalendarMutation } from "state/api";
import { Link } from "react-router-dom";
import EditCalendarModal from "modals/EditCalendarModal";

const Calendar = () => {
  const theme = useTheme();
  const { data, isLoading } = useListCalendarQuery();
  const [deleteCalendarTrigger, result] = useDeleteCalendarMutation();
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const columns = [
    {
      field: "monday",
      headerName: "Monday",
      flex: 1,
    },
    {
      field: "tuesday",
      headerName: "Tuesday",
      flex: 1,
    },
    {
      field: "wednesday",
      headerName: "Wednesday",
      flex: 1,
    },
    {
      field: "thursday",
      headerName: "Thursday",
      flex: 1,
    },
    {
      field: "friday",
      headerName: "Friday",
      flex: 1,
    },
    {
      field: "saturday",
      headerName: "Saturday",
      flex: 1,
    },
    {
      field: "sunday",
      headerName: "Sunday",
      flex: 1,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "End Date",
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
              deleteCalendarTrigger({ id: params.id });
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
    <>
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="Calendar" subtitle="List of Calendar Dates" />
          <Box>
            <Link to="/addcalendar">
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                Add Calendar
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
              loading={isLoading || !data}
              getRowId={(row) => row.id}
              rows={rows || []}
              columns={columns}
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
          <EditCalendarModal
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

export default Calendar;
