import axios from "axios";
import Router, { useRouter } from "next/router";
import { appDirectories, initialUrl } from "shared/constants/AppConst";





//const mainServerAddress = 'https://vercel-aeci-safety.vercel.app' 

const mainServerAddress = 'http://192.168.8.116:3000/'

const jwtAxios = axios.create({

  //baseURL: "https://edcarlos-gomango.herokuapp.com/api/", // YOUR_API_URL HERE
  //baseURL: "http://192.168.8.117:4001/", // YOUR_API_URL HERE http://192.168.8.116:4001/
  //baseURL: "http://192.168.8.116:4001/",
  //baseURL: "../../../../pages/api/",
  //baseURL: "http://192.168.8.116:4001/",

  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === "Token is not valid") {
      console.log("Need to logout user");
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  }
);
export const setAuthToken = (token?: string) => {
  // const router = useRouter();
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
    // Router.reload();
    //router.push("/signin");
  }
};

export const AxiosURL = () => {
  //return jwtAxios.defaults.baseURL
  //return 'http://192.168.8.116:3000/api/safety/scoreboard/'
  return `${mainServerAddress}/api/safety/scoreboard/`
}

export const AxiosExpensesURL = () => {
  //return jwtAxios.defaults.baseURL
  //return 'http://192.168.8.116:3000/api/safety/scoreboard/'
  return `${mainServerAddress}api/barber/expenses/`
}

export default jwtAxios;

