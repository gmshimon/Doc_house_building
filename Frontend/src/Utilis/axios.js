/* eslint-disable no-unused-vars */
import axios from "axios"; 

const prod = "https://backend-indol-eta-44.vercel.app/"

const local = 'http://localhost:3000'

const instance = axios.create({
  baseURL : local,
});

export default instance;