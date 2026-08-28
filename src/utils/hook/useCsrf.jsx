import {useState, useContext, createContext} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {API_BASE_URL} from "../../config";


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
    axios.get(`${API_BASE_URL}/security/csrf/form`, {withCredentials: true}).then(res => {
      setToken(res.data.csrfToken);
      return true
    })
  }
  return{
    token,
    getCsrfToken
  }
}

ProvideCsrf.propTypes = {
  children: PropTypes.node
}
