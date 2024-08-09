import axios from "axios";
import { BASE_URL } from "../utils/constants";

const API_URL = `${BASE_URL}/api/auth`;

export const login = async (formData) => {
  try {
    const data = await axios.post(`${API_URL}/login`, { ...formData });
    return data.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const register = async (formData) => {
  try {
    const data = await axios.post(`${API_URL}/register`, {
      ...formData,
    });
    return data.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
