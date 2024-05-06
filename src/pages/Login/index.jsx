import "./login.scss"
import FormLogin from "../../components/FormLogin/index.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuth} from "../../utils/store/selectors/AuthSelectors.js";

function Login(){

    const {auth} = useSelector(getAuth)
    const navigate = useNavigate()
    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [auth]);

  return (
    <div className={'container-login'}>
      <FormLogin/>
    </div>
  );
}

export default Login