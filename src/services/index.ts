import { NEXT_LOCALE, PageUrls, USER_TOKEN } from "@/constants";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const UNAUTHORIZED_STATUS_CODE = 401;
const DEFAULT_LOCALE = "en";

export const API: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token: string): void {
  Cookies.set(USER_TOKEN, token, {
    secure: true,
    sameSite: "Strict",
    expires: 7, // 7 days
  });
  updateAPIAuthHeader(token);
}

export function removeAuthToken(): void {
  Cookies.remove(USER_TOKEN);
  deleteAPIAuthHeader();
}

function updateAPIAuthHeader(token: string): void {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function deleteAPIAuthHeader(): void {
  delete API.defaults.headers.common["Authorization"];
}

function handleUnauthorizedError(): void {
  removeAuthToken();
  const locale = Cookies.get(NEXT_LOCALE) || DEFAULT_LOCALE;
  window.location.href = `/${locale}/${PageUrls.Auth.signin}`;
}

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get(USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === UNAUTHORIZED_STATUS_CODE) {
      handleUnauthorizedError();
    }
    return Promise.reject(error);
  },
);

export default API;
