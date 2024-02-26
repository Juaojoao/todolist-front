import { connectionAPI } from "../../services/api/api";

export const getTokenFromLocalStorage = () => localStorage.getItem('token')?.replace(/"/g, '');

export const getAuthorizationToken = (token: string | undefined) => connectionAPI.defaults.headers['Authorization'] = `Bearer ${token}`;