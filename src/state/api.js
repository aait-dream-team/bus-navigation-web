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
    getRoute: build.query({
      query: (data) => ({
        url: `routes/${data.id}/`,
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteRoute: build.mutation({
      query: (data) => ({
        url: `routes/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    patchRoute: build.mutation({
      query: (data) => ({
        url: `routes/${data.id}/`,
        method: "PUT",
        body: data,
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
    deleteAgency: build.mutation({
      query: (data) => ({
        url: `agencies/${data.id}/`,
        method: "DELETE",
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
    patchTerminal: build.mutation({
      query: (data) => ({
        url: `stops/${data.id}/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteTerminal: build.mutation({
      query: (data) => ({
        url: `stops/${data.id}/`,
        method: "DELETE",
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
    patchCalendarDate: build.mutation({
      query: (data) => ({
        url: `calendar_dates/${data.id}/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteCalendarDate: build.mutation({
      query: (data) => ({
        url: `calendar_dates/${data.id}/`,
        method: "DELETE",
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
    patchCalendar: build.mutation({
      query: (data) => ({
        url: `calendars/${data.id}/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteCalendar: build.mutation({
      query: (data) => ({
        url: `calendars/${data.id}/`,
        method: "DELETE",
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
    patchFare: build.mutation({
      query: (data) => ({
        url: `fares/${data.id}/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteFare: build.mutation({
      query: (data) => ({
        url: `fares/${data.id}/`,
        method: "DELETE",
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
    patchTransfer: build.mutation({
      query: (data) => ({
        url: `transfers/${data.id}/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteTransfer: build.mutation({
      query: (data) => ({
        url: `transfers/${data.id}/`,
        method: "DELETE",
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
    createTrip: build.mutation({
      query: (data) => ({
        url: "trips/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    patchTrip: build.mutation({
      query: (data) => ({
        url: `trips/${data.id}/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteTrip: build.mutation({
      query: (data) => ({
        url: `trips/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    resetPasswordRequest: build.mutation({
      query: (data) => ({
        url: "api-initiate-reset-password/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: "api-reset-password/",
        method: "PUT",
        body: data,
      }),
    }),
    listOfShapes: build.query({
      query: (data) => ({
        url: "shapes/",
        method: "GET",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteShape: build.mutation({
      query: (data) => ({
        url: `shapes/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createShape: build.mutation({
      query: (data) => ({
        url: `shapes/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    updateShape: build.mutation({
      query: (data) => ({
        url: `shapes/${data.id}/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    listOfStopTimes: build.query({
      query: (data) => ({
        url: `stop_times/`,
        method: "GET",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    deleteStopTimes: build.mutation({
      query: (data) => ({
        url: `stop_times/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createStopTime: build.mutation({
      query: (data) => ({
        url: `stop_times/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
    }),
    updateStopTime: build.mutation({
      query: (data) => ({
        url: `stop_times/${data.id}/`,
        method: "PUT",
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
  useListOfShapesQuery,
  useDeleteShapeMutation,
  useCreateShapeMutation,
  useUpdateShapeMutation,
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
  useDeleteRouteMutation,
  useDeleteCalendarMutation,
  useDeleteCalendarDateMutation,
  useDeleteFareMutation,
  useDeleteTerminalMutation,
  useDeleteAgencyMutation,
  useDeleteTransferMutation,
  useDeleteTripMutation,
  useGetRouteQuery,
  usePatchRouteMutation,
  usePatchTerminalMutation,
  usePatchCalendarDateMutation,
  usePatchCalendarMutation,
  usePatchFareMutation,
  usePatchTransferMutation,
  usePatchTripMutation,
  useResetPasswordRequestMutation,
  useResetPasswordMutation,
  useListOfStopTimesQuery,
  useDeleteStopTimesMutation,
  useCreateStopTimeMutation,
  useUpdateStopTimeMutation,
} = api;
