import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const accesstoken = localStorage.getItem("accesstoken");
    if (accesstoken) {
      request.headers["Authorization"] = `Bearer ${accesstoken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshtoken = localStorage.getItem("refreshtoken"); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.post("http://127.0.0.1:8000/api/token/", {
          refresh:refreshtoken,
        });
        if (response){
          const  newaccesstoken = response.data.access;
        const  newrefreshtoken = response.data.refresh;
        // Store the new access and refresh tokens.
        localStorage.setItem("accesstoken", newaccesstoken);
        localStorage.setItem("refreshtoken", newrefreshtoken);
        console.log("acccess:",newaccesstoken,"refresh:",newrefreshtoken);
        
        // Update the authorization header with the new access token.
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newaccesstoken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newaccesstoken}`; // Update the header in the original request
        return axiosInstance(originalRequest); // Retry the original request with the new access token.
        }else(err)=>{
          console.error("error",err); 
        } 
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2MDIyODk4LCJpYXQiOjE3MjYwMjI3NzgsImp0aSI6ImQ2MDcyZDYxZjk4MTRhMmNiN2MxYjBkN2U1ZmVlZjgyIiwidXNlcl9pZCI6MX0.9LTmz6kTiH7FfneKqUhOqUH8whHstnlxlS0TuW6bhXs