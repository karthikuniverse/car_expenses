export type UserRole = 'admin' | 'driver';

export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  car_number?: string;
  is_active: boolean;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password?: string;
  role: UserRole;
  car_number?: string;
}

export interface MeResponse {
  success: boolean;
  data: User;
}

export interface VerifyEmailPayload {
  email: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    name: string;
  };
  error?: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword?: string;
  password?: string;
  confirmPassword?: string;
  confirm_password?: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
}

