import axios from "axios";

export const JsonpalaceholderService = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {'Content-type': 'application/json'}
  })