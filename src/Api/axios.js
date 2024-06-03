// http://localhost:3000
import axios from "axios"

const  axiosInstance = axios.create({
    // baseURL: "http://localhost:3000"
    baseURL:"https://amazon-api-deploy-2rqy.onrender.com/",
});

export {axiosInstance};