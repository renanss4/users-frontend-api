import axios from "axios";

const api = axios.create({
    baseURL: "https://api.example.com", // Replace after with my API URL
});

export default api;