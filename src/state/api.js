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
  }),
});

export const {
  useLoginMutation,
  useListOfRoutesQuery,
  useListOfTerminalsQuery,
  useListOfAgenciesQuery,
  useCreateRouteMutation,
  useCreateTerminalMutation,
  useCreateAgencyMutation,
  useCreateAdminMutation,
  useCreateReportMutation,
} = api;
