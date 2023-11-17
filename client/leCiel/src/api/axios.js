import axios from 'axios';

const server = axios.create({
  baseURL: 'https://ciel.norepine.tech/',
});

export default server;
