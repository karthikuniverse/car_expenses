import { apiSlice } from './apiSlice';
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  MeResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from '../types/auth';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    getMe: builder.query<MeResponse, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailPayload>({
      query: (payload) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordPayload>({
      query: (payload) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authApi;

