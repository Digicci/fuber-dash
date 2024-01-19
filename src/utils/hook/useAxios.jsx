import {useContext,createContext} from "react";
import {useCsrf} from "./useCsrf.jsx";
import axios from "axios";

const AxiosContext = createContext();
const apiPath = 'http://localhost:8000/api';

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
    axios.defaults.headers.common['Authorization'] = JWT ? `Bearer ${JWT}` : null ;
    axios.defaults.headers.post['X-CRSF-TOKEN'] = csrf.token;
    axios.defaults.withCredentials = true;
  }

  const get = (path,config) => {
    setHeader();
    return axios.get(`${apiPath}/${path}`, config);
  };

  const post = (path, data, config) => {
      setHeader();
      return axios.post(`${apiPath}/${path}`, data, config);
  };

  const put = (path,data,config) => {
    setHeader();
    return axios.put(`${apiPath}/${path}`, data, config);
  }

  const del = (path,config) => {
    setHeader();
    return axios.delete(`${apiPath}/${path}`, config);
  }

  return {
    get,
    post,
    put,
    del
  };
}