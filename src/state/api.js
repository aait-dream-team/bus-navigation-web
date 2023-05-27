import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  reducerPath: "adminApi",
  tagTypes: [],
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
    })
  }),
});

export const { useLoginMutation } = api;
