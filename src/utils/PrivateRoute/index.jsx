import {useAuthAdmin} from "../hook/useAuthAdmin.jsx";
import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuth} from "../store/selectors/AuthSelectors.js";
import {useEffect} from "react";


function PrivateRoute({children}){
  const authFunc = useAuthAdmin()
  const location = useLocation()
  const auth = useSelector(getAuth)

  useEffect(() => {
    if(!auth.auth) {
      navigate()
    }
  }, [auth.auth]);



  const navigate = () =>{
    return <Navigate to='/login' state={{from:location}} replace />
  }
  return authFunc.isConnected() ? children : navigate();
}

export default PrivateRoute;