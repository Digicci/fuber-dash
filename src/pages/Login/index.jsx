import FormLogin from "../../components/FormLogin/index.jsx";
import {useEffect} from "react";
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx";
import {useNavigate} from "react-router-dom";

function Login(){

    const auth = useAuthAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.isConnected()) {
            navigate('/')
        }
    }, [auth.auth]);

  return (
    <div className={'container-login'}>
      <FormLogin/>
    </div>
  );
}

export default Login