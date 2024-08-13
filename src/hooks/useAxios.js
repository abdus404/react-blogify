import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import useAuth from "./useAuth";

export default function useAxios() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const accessToken = auth?.token?.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = auth?.token?.refreshToken;
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { accessToken } = response.data;
            if (!accessToken) {
              throw new Error("Access token not returned");
            }

            setAuth((prev) => ({
              ...prev,
              token: { ...prev.token, accessToken },
            }));

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          } catch (error) {
            console.error("Error refreshing token:", error);
            setAuth(null); // Clear auth state
            navigate("/login"); // Redirect to login page
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth, navigate]);

  return { api };
}
