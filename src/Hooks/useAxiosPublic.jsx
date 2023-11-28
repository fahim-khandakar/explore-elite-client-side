import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://explore-elite-server.vercel.app/",
});

const userAxiosPublic = () => {
  return axiosPublic;
};

export default userAxiosPublic;
