import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().global.token;

  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token) {
  //     headers.set("authorization", `Bearer ${token}`);
  //     console.log("Token: ",token)
  //   }

  //   return headers;
  // },
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
      }),
    }),
    createRoute: build.mutation({
      query: (data) => ({
        url: "routes/",
        method: "POST",
        body: data,
      }),
    }),
    listOfAgencies: build.query({
      query: () => ({
        url: "agencies/",
        method: "GET",
      }),
    }),
    createAgency: build.mutation({
      query: (data) => ({
        url: "agencies/",
        method: "POST",
        body: data,
      }),
    }),
    listOfTerminals: build.query({
      query: () => ({
        url: "stops/",
        method: "GET",
      }),
    }),
    createTerminal: build.mutation({
      query: (data) => ({
        url: "stops/",
        method: "POST",
        body: data,
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
} = api;
