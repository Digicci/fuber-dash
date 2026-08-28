import {useContext,createContext} from "react";
import {useCsrf} from "./useCsrf.jsx";
import axios from "axios";
import {API_BASE_URL} from "../../config";

const AxiosContext = createContext();
const api = axios.create({
  baseURL: API_BASE_URL
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
    // Sur `common` et non `post` : les PUT et DELETE partaient sans token CSRF.
    api.defaults.headers.common['X-CSRF-TOKEN'] = csrf.token;
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