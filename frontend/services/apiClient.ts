// Third party Imports
import axios from "axios";

// Redux Imports
import { persistor } from "@/store/store";

// Utils Imports
import { errorHandler } from "@/utils/CommonFunctions";

export const BASEURL = process.env.NEXT_PUBLIC_BASEURL as string;

const apiClient = axios.create({
  baseURL: `${BASEURL}/backend/api`,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;
    if (
      (err.response.status === 401 || err.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      persistor.purge();
      localStorage.clear();
      return apiClient(originalRequest);
    }
    errorHandler(err);
    return Promise.reject(err);
  }
);

export default apiClient;
