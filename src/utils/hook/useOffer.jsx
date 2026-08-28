import {createContext,useContext} from "react";
import {useAxios} from "./useAxios.jsx";
import PropTypes from "prop-types";

const AuthContext = createContext();
const basePath = 'offre';

export function ProvideOffer({children}) {
  const offer = useProviderOffer();
  return <AuthContext.Provider value={offer}>{children}</AuthContext.Provider>
}

export const useOffer = () => {
  return useContext(AuthContext);
}

function useProviderOffer() {
  const axios = useAxios();

  const register = (data) => {
    return axios.post(`${basePath}/createOffer`, data)
  }

  const getOffer = () => {
      return axios.get(`${basePath}/getOffers`, {withCredentials:true})
  }

  return{
    register,
    getOffer
  }
}

ProvideOffer.propTypes = {
  children: PropTypes.node
}
