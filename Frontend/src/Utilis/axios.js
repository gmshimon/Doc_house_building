/* eslint-disable no-unused-vars */
import axios from "axios"; 

// const prod = "https://bistro-boss-mauve.vercel.app/api/v1/"

const local = 'http://localhost:5000/api/v1/'

const instance = axios.create({
  baseURL : local,
});

export default instance;