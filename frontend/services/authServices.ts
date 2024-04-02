import { EditProfileProps, LoginProps } from "@/types";
import apiClient from "./apiClient";

const login = (data: LoginProps) => {
  return apiClient.post("/signin", data);
};

const updateProfile = (data: EditProfileProps, token: string) => {
  return apiClient.post("/update-profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getProfile = (token: string) => {
  return apiClient.get("/get-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const authServices = {
  login,
  updateProfile,
  getProfile,
};

export default authServices;
