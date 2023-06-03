import React from "react";
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
import { useListCalendarDatesQuery } from "state/api";
import { Link } from "react-router-dom";

const CalendarDates = () => {
  const theme = useTheme();
  const { data, isLoading } = useListCalendarDatesQuery();

  const columns = [
    {
      field: "service",
      headerName: "Service",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "exception_type",
      headerName: "Exception Type",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Calendar Dates" subtitle="List of Calendar Dates" />
        <Box>
          <Link to="/addcalendardates">
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Add Calendar Date
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
            rows={data || []}
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default CalendarDates;
