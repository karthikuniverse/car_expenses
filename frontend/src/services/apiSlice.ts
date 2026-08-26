import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Setup our API base slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // Replace with your backend URL
    prepareHeaders: (headers) => {
      // By default, retrieve the JWT token from localStorage
      let token = localStorage.getItem('token');
      if (token) {
        // Strip surrounding quotes if the token is serialized as JSON in localStorage
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Expenses'],
  endpoints: () => ({}),
});
