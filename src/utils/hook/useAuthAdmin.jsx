import {createContext, useContext, useState, useEffect, useRef, useCallback} from "react";
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

  const clearSession = useCallback(() => {
    dispatch(setAuth(null))
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY)
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_REFRESH_TOKEN_KEY)
  }, [dispatch])

  const clearSessionRef = useRef(clearSession)
  clearSessionRef.current = clearSession

  // L'intercepteur etait enregistre dans le corps du hook : il etait donc
  // reempile a chaque rendu. Il purgeait de plus les tokens sur *toute* erreur
  // (400, 500 compris), ce qui deconnectait l'admin a la moindre anomalie.
  useEffect(() => {
    const interceptorId = axios.api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config
          const status = error.response && error.response.status

          if (status !== 401 || !originalRequest) {
            return Promise.reject(error)
          }
          if (originalRequest.url === '/admin/refreshToken' || originalRequest._retry) {
            clearSessionRef.current()
            return Promise.reject(error)
          }

          const refreshToken = localStorage.getItem(LOCAL_STORAGE_ADMIN_JWT_REFRESH_TOKEN_KEY)
          if (!refreshToken) {
            clearSessionRef.current()
            return Promise.reject(error)
          }

          originalRequest._retry = true
          try {
            const response = await axios.api.post('/admin/refreshToken', null, {
              headers: {Authorization: `Bearer ${refreshToken}`}
            })
            localStorage.setItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY, response.data.token)
            originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`
            return axios.api(originalRequest)
          } catch (refreshError) {
            clearSessionRef.current()
            return Promise.reject(refreshError)
          }
        }
    )

    return () => axios.api.interceptors.response.eject(interceptorId)
  }, [axios])

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
        if(res.status === 401) {
          dispatch(setAuth(null));
          localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY);
        }else if(res.data) {
          dispatch(setAuth(res.data));
        }else {
          dispatch(setAuth(null));
          localStorage.removeItem(LOCAL_STORAGE_ADMIN_JWT_TOKEN_KEY);
        }
      }).catch(() => {
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

    return axios.post(`${basePath}/updateDriverCommission`,data)
  }

  const signout = () => {
    clearSession();
    setAdmin(null);
    navigate("/login");
  }
  useEffect(() => {
    getAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isConnected = () => auth.auth

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