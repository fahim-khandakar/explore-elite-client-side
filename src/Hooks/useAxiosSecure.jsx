import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://explore-elite-server.vercel.app/",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const status = err.response.status;
      console.log("status error in the interceptor ", status);
      if (status === 401 || status === 403) {
        navigate("/login");
        await logOut();
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
