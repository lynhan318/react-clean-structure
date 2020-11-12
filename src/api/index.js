import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_DOMAIN,
});

export const getLikes = (id) => new Promise.resolve(id);
