import {useAuthAdmin} from "../hook/useAuthAdmin.jsx";
import {useLocation, Navigate} from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({children}){
  const authFunc = useAuthAdmin()
  const location = useLocation()

  // La redirection se fait en retournant <Navigate/> depuis le rendu.
  // L'ancienne version appelait navigate() dans un useEffect, or cette fonction
  // *retourne* du JSX : elle ne provoquait aucune navigation.
  if (!authFunc.isConnected()) {
    return <Navigate to='/login' state={{from: location}} replace />
  }

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node
}

export default PrivateRoute;
