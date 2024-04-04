import {useAuthAdmin} from "../hook/useAuthAdmin.jsx";
import {useLocation, Navigate} from "react-router-dom";


function PrivateRoute({children}){
  const auth = useAuthAdmin()
  const location = useLocation()

  const navigate = () =>{
    return <Navigate to='/login' state={{from:location}} replace />
  }
  return auth.isConnected() ? children : navigate();
}

export default PrivateRoute;