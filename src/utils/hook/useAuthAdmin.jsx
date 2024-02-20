import {createContext, useContext, useState} from "react";
import {useAxios} from "./useAxios.jsx";
import  {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setAuth} from "../store/actions/AuthActions.js";
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
        if(res.status === 401) {
          dispatch(setAuth(null));
          localStorage.removeItem('admin_token');z
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

  const getEntreprises = async () => {
    return await axios.get(`${basePath}/entreprise`,{withCredentials: true});
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
    auth
  }
}