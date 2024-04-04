import {createContext, useContext, useState} from "react";
import {useAxios} from "./useAxios.jsx";
import  {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setAuth} from "../store/slices/AuthSlice.js";
import {getAuth} from "../store/selectors/AuthSelectors.js";

const AuthContext = createContext();
const basePath = "admin";


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
    if(localStorage.getItem("admin_token")){
      axios.get(`${basePath}/get`).then((res) =>{
        console.log(res)
        if(res.status === 401) {
          dispatch(setAuth(null));
          localStorage.removeItem('admin_token');
        }else if(res.data) {
          dispatch(setAuth(res.data));
        }else {
          dispatch(setAuth(null));
          localStorage.removeItem('admin_token');
        }
      }).catch((err) => {
        console.log(err)
        dispatch(setAuth(null));
        localStorage.removeItem('admin_token');
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


  const confirmedDriver = (id) => {
    if(id === null){
      return new Promise((resolve) =>{
        resolve(null)
      })
    }
    const data = {
      id,
      statut: 'confirmed'
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
      statut: 'refused'
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
      statut: 'banned'
    }
    return axios.post(`${basePath}/updateDriverPending`, data)
  }

  const signout = () => {
    localStorage.removeItem('admin_token');
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
    auth
  }
}