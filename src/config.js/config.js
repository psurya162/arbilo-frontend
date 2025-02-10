// frontend/src/config.js
const config = {
    API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://arbilo.com'
      : 'http://localhost:5000'
  };
  
  export default config;