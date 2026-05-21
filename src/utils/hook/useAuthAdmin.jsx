import {createContext, useContext, useState} from "react";
import {useAxios} from "./useAxios.jsx";
import  {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setAuth} from "../store/slices/AuthSlice.js";
import {getAuth} from "../store/selectors/AuthSelectors.js";
import localStorageConstant from "../../constants/localStorage.constant.js";

const AuthContext = createContext();
const basePath = "admin";
const LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY = localStorageConstant.ADMIN_JWT_TOKEN_KEY;
const LOCAL_STORAGE_ADMIN_JWT_REFRESH_TOKEN_KEY = localStorageConstant.ADMIN_JWT_REFRESH_TOKEN_KEY

const STATUT = {
  CONFIRMED: "confirmed",
  REFUSED: "refused",
  BANNED: "banned"
}


// eslint-disable-next-line react/prop-types
export function ProvideAuthAdmin({children}) {
  const authAdmin = useProvideAuthAdmin();
  return <AuthContext.Provider value={authAdmin}>{children}</AuthContext.Provider>
}

export const useAuthAdmin = () => {
  return useContext(AuthContext);
}

function useProvideAuthAdmin(){
  const [admin, setAdmin] = useState(null)
  const axios = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);

  axios.api.interceptors.response.use(
      (response) => response,
      async function (error) {
        const originalRequest = error.config
        if (error.config.url !== '/admin/refreshToken' && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem(LOCAL_STORAGE_ADMIN_JWT_REFRESH_TOKEN_KEY)
          if(refreshToken && refreshToken !== '') {
            axios.api.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`
            console.log('refreshToken')
            await axios.api.post('/admin/refreshToken').then((response) => {
              originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`
              axios.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
              localStorage.setItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY, response.data.token)
            })
            return axios.api(originalRequest)
          }
        }
        dispatch(setAdmin(null))
        localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY)
        localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_REFRESH_TOKEN_KEY)
        return Promise.reject(error);
      }
  )

  const signin = (email,mdp,token) => {
    let data
    if(email.includes('@')){
      data = {
        mail: email,
        mdp,
        _csrf: token
      }
    }
    return axios.post(`${basePath}/login`,data)
  }

  const getAdmin = () => {
    if(auth.user !== null){
      return;
    }
    if(localStorage.getItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY)){
      axios.get(`${basePath}/get`).then((res) =>{
        console.log(res)
        if(res.status === 401) {
          dispatch(setAuth(null));
          localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY);
        }else if(res.data) {
          dispatch(setAuth(res.data));
        }else {
          dispatch(setAuth(null));
          localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY);
        }
      }).catch((err) => {
        dispatch(setAuth(null));
        localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY);
      })
    }else {
      dispatch(setAuth(null));
    }
  }

  const getEntreprises = () => {
    return axios.get(`${basePath}/entreprise`,{withCredentials: true});
  }


  const getTeamEmployer = (id) => {
    return axios.get(`${basePath}/team/${id}`, {withCredentials: true})
  }

  // const updateDriver = (id, statut) => {
  //   if(id === null){
  //     return new Promise((resolve) =>{
  //       resolve(null)
  //     })
  //   }
  //   const data = {
  //     id,
  //     statut
  //   }
  //   return axios.post(`${basePath}/updateDriverPending`, data)
  // }

  const confirmedDriver = (id) => {
    if(id === null){
      return new Promise((resolve) =>{
        resolve(null)
      })
    }
    const data = {
      id,
      statut: STATUT.CONFIRMED
    }
    return axios.post(`${basePath}/updateDriverPending`, data)
  }
  const refusedDriver = (id) => {
    if(id === null){
      return new Promise((resolve) =>{
        resolve(null)
      })
    }
    const data = {
      id,
      statut: STATUT.REFUSED
    }
    return axios.post(`${basePath}/updateDriverPending`, data)
  }
  const bannedDriver = (id) => {
    if(id === null){
      return new Promise((resolve) =>{
        resolve(null)
      })
    }
    const data = {
      id,
      statut: STATUT.BANNED
    }
    return axios.post(`${basePath}/updateDriverPending`, data)
  }

  const updateDriverCommission = (id,commission) => {
    if(id == null){
      return new Promise((resolve) => {
        resolve(null)
      })
    }
    const data = {
      driverId: id,
      commission: commission
    }

    console.log('payload envoyé:', data);
    return axios.post(`${basePath}/updateDriverCommission`,data)
  }

  const signout = () => {
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY);
    localStorage.clear();
    dispatch(setAuth(null));
    setAdmin(null);
    navigate("/login");
  }
  const isConnected = () => {
    getAdmin()
    return auth.auth
  }

  return{
    admin,
    setAdmin,
    signin,
    signout,
    isConnected,
    getAdmin,
    getEntreprises,
    getTeamEmployer,
    confirmedDriver,
    refusedDriver,
    bannedDriver,
    updateDriverCommission
  }
}