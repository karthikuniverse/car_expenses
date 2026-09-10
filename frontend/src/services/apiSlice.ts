import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { loadingManager } from '../utils/loadingManager';

// Raw base query with JWT authorization header handling
const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api', // Backend API URL
  prepareHeaders: (headers) => {
    let token = localStorage.getItem('token');
    if (token) {
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Interceptor base query that triggers top progress loading state automatically
const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  loadingManager.start();
  try {
    const result = await rawBaseQuery(args, api, extraOptions);
    return result;
  } finally {
    loadingManager.done();
  }
};

// Setup our API base slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['User', 'Expenses'],
  endpoints: () => ({}),
});

