import axios from 'axios';

// Set base URL from environment variable or default to localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Configure axios defaults
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export default axios;
