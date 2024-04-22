import {useContext,createContext} from "react";
import {useCsrf} from "./useCsrf.jsx";
import axios from "axios";

const AxiosContext = createContext();
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_PATH
})

// eslint-disable-next-line react/prop-types
export function ProvideAxios({ children }){
  const axios = useProvideAxios();
  return (
      <AxiosContext.Provider value={axios}>
          {children}
      </AxiosContext.Provider>
  );
}

export const useAxios = () => {
  return useContext(AxiosContext);
}

function useProvideAxios() {
  const csrf = useCsrf();
  const setHeader = () => {
    const JWT = localStorage.getItem('admin_token')
    api.defaults.headers.common['Authorization'] = JWT ? `Bearer ${JWT}` : null ;
    api.defaults.headers.post['X-CSRF-TOKEN'] = csrf.token;
    api.defaults.withCredentials = true;
  }

  const get = (path,config) => {
    setHeader();
    return api.get(`/${path}`, config);
  };

  const post = (path, data, config) => {
      setHeader();
      return api.post(`/${path}`, data, config);
  };

  const put = (path,data,config) => {
    setHeader();
    return api.put(`/${path}`, data, config);
  }

  const del = (path,config) => {
    setHeader();
    return api.delete(`/${path}`, config);
  }

  return {
    get,
    post,
    put,
    del,
    api
  };
}