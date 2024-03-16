
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

export const setupInterceptors = (loadingContext) => {
  if (!loadingContext || !loadingContext.showLoading || !loadingContext.hideLoading) {
    console.error("Error: Loading context is not properly initialized.");
    return;
  }

  instance.interceptors.request.use(
    async (config) => {
      loadingContext.showLoading(); 
      try {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      if (loadingContext.hideLoading) { 
        loadingContext.hideLoading(); 
      }
      return response;
    },
    (error) => {
      if (loadingContext.hideLoading) {
        loadingContext.hideLoading(); 
      }
      return Promise.reject(error);
    }
  );
};

export default instance;
