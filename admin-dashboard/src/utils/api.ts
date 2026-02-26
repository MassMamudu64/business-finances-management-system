import axios, { AxiosError } from "axios";

import { getToken, clearAuth } from "./auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // For any non-login 401, force logout and redirect to login.
    if (status === 401 && !requestUrl.includes("/auth/login")) {
      clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/login?expired=1";
      }
    }

    return Promise.reject(error);
  }
);

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;

    if (data?.message) return data.message;
    if (typeof data?.detail === "string") return data.detail;
    if (typeof data === "string") return data;
  }

  return "Unexpected error. Please try again.";
}

// Typed helpers for backend endpoints to avoid inline fetch logic in components.

export function login(payload: { email: string; password: string }) {
  return api.post("/auth/login", payload);
}

export function fetchAdminSummary() {
  return api.get("/admin/summary").then((res) => res.data);
}

export function fetchAdminMonthly() {
  return api.get("/admin/monthly").then((res) => res.data ?? []);
}

export function fetchAdminEmployees() {
  return api.get("/admin/employees").then((res) => res.data ?? []);
}

export function uploadEmployeeReceipt(file: File) {
  const form = new FormData();
  form.append("file", file);

  return api.post("/employee/upload", form).then((res) => res.data);
}
