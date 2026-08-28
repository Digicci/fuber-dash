import {useState, useContext, createContext} from "react";
import axios from "axios";

const apiPath = import.meta.env.VITE_API_BASE_PATH;
const CsrfContext = createContext();

export function ProvideCsrf({ children }){
  const csrf = useProvideCsrf();
  return <CsrfContext.Provider value={csrf}>{children}</CsrfContext.Provider>
}

export const useCsrf = () => {
  return useContext(CsrfContext);
}

function useProvideCsrf(){
  const [token,setToken] = useState(null);
  const getCsrfToken = () => {
    axios.get(`${apiPath}/security/csrf/form`, {withCredentials: true}).then(res => {
      setToken(res.data.csrfToken);
      return true
    })
  }
  return{
    token,
    getCsrfToken
  }
}