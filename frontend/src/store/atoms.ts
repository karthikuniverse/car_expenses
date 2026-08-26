import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { User } from '../types/auth';

// Token atom synced with localStorage
export const tokenAtom = atomWithStorage<string | null>('token', null);

// User atom synced with localStorage
export const userAtom = atomWithStorage<User | null>('user', null);

// Derived atom to check if user is authenticated
export const isAuthenticatedAtom = atom((get) => get(tokenAtom) !== null);

// UI states
export const themeAtom = atom<'light' | 'dark'>('light');
