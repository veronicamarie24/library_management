const BASE_SERVER_URL = "http://localhost:3000";
const AUTH_PATH = "auth";
const API_PATH = "api";

export const AUTH_ROUTES = {
  LOGIN: `${BASE_SERVER_URL}/${AUTH_PATH}/login`,
};

export const API_ROUTES = {
  BOOKS: `${BASE_SERVER_URL}/${API_PATH}/books`,
};
