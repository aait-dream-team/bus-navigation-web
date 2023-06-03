import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: [],
  keepUnusedDataFor: 1,
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: "api-token-auth/",
        method: "POST",
        body: {
          username: data.username,
          password: data.password,
        },
      }),
    }),
    listOfRoutes: build.query({
      query: () => ({
        url: "routes/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createRoute: build.mutation({
      query: (data) => ({
        url: "routes/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    listOfAgencies: build.query({
      query: () => ({
        url: "agencies/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createAgency: build.mutation({
      query: (data) => ({
        url: "agencies/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    listOfTerminals: build.query({
      query: () => ({
        url: "stops/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createTerminal: build.mutation({
      query: (data) => ({
        url: "stops/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createAdmin: build.mutation({
      query: (data) => ({
        url: "admins/create/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createReport: build.mutation({
      query: (data) => ({
        url: "alerts/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    ListCalendarDates: build.query({
      query: () => ({
        url: "calendar_dates/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createCalendarDate: build.mutation({
      query: (data) => ({
        url: "calendar_dates/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    listCalendar: build.query({
      query: () => ({
        url: "calendars/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createCalendar: build.mutation({
      query: (data) => ({
        url: "calendars/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    listFares: build.query({
      query: () => ({
        url: "fares/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createFare: build.mutation({
      query: (data) => ({
        url: "fares/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    listTransfers: build.query({
      query: () => ({
        url: "transfers/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    addTransfer: build.mutation({
      query: (data) => ({
        url: "transfers/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    listTrips: build.query({
      query: (data) => ({
        url: "trips/",
        method: "GET",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createTrip : build.mutation({
      query: (data) => ({
        url: "trips/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useListOfRoutesQuery,
  useListOfTerminalsQuery,
  useListOfAgenciesQuery,
  useListCalendarDatesQuery,
  useListCalendarQuery,
  useListFaresQuery,
  useListTransfersQuery,
  useListTripsQuery,
  useCreateRouteMutation,
  useCreateTerminalMutation,
  useCreateAgencyMutation,
  useCreateAdminMutation,
  useCreateReportMutation,
  useCreateCalendarDateMutation,
  useCreateCalendarMutation,
  useCreateFareMutation,
  useAddTransferMutation,
  useCreateTripMutation,
} = api;
