import axios from "axios";

axios.interceptors.push({
  responseError: (error) => {
    if (error.response.status === 401) {
      router.push("/login");
    }
    return Promise.reject(error);
  },
});
