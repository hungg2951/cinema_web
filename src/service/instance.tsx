import axios from "axios";

let accessToken;
try {
  const root = JSON.parse(localStorage.getItem("persist:root") || "{}");
  const user = JSON.parse(root.authReducer || "{}");
  if (user && user.accessToken) accessToken = user.accessToken;
} catch (error) {
  console.log("Error parsing localStorage:", error);
}

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  timeout: 90000,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const AxiosRequest = {
  post(path: string, data: {}, options = {}): Promise<any> {
    return axiosClient.post(path, data, options);
  },
  get(path: string, options = {}): Promise<any> {
    return axiosClient.get(path, options);
  },
  put(path: string, data: {}, options = {}): Promise<any> {
    return axiosClient.put(path, data, options);
  },
  delete(path: string, options = {}): Promise<any> {
    return axiosClient.delete(path, options);
  },
};
export default axiosClient;
