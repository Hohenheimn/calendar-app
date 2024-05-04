const envConfig = {
  API_BASE_URL:
    (import.meta as any).env.VITE_REACT_APP_API_BASE_URL ||
    "http://localhost:8080/api",
};
export default envConfig;
