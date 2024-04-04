import {createContext,useContext} from "react";
import {useAxios} from "./useAxios.jsx";
import axios from "axios";

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

  const getOffer = async () => {
      return await axios.get(`${basePath}/getOffers`, {withCredentials:true})
  }

  return{
    register,
    getOffer
  }
}