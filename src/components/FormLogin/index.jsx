import './formLogin.scss'
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { useAuthAdmin } from "../../utils/hook/useAuthAdmin.jsx"
import {useNavigate} from "react-router-dom";
import {setAuth,} from "../../utils/store/slices/AuthSlice.js";
import {toast} from "react-toastify";
import {useCsrf} from "../../utils/hook/useCsrf.jsx";
import localStorageConstant from "../../constants/localStorage.constant.js";

function FormLogin(){

  const authAdmin = useAuthAdmin()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [admin, setAdmin] = useState({
    mail:'',
    mdp:''
  })
  const idToast = 1
  const toastTimer = 2000
  const csrf = useCsrf()

  useEffect(() => {
    // if(authAdmin.isConnected()){
    //   navigate('/',{replace:true})
    // }
    csrf.getCsrfToken()
  }, [])
  const handleChange = (e,field) => {
    const state = {...admin}
    if(field === "mail"){
      state[field] = e.target.value.replace(/ /g,'')
    } else {
      state[field] = e.target.value
    }
    setAdmin(state)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(admin.mail === '' || admin.mdp === ''){
      toast('Merci de completer tout les champs obligatoire', {
        position: "top-right",
        autoClose: toastTimer,
        type: 'error',
        icon: '🤔'
      })
    }else {
      toast.loading('Connexion en cours...', {
        position: "top-right",
        autoClose: false,
        toastId: idToast
      })
      authAdmin.signin(admin.mail, admin.mdp, csrf.token).then((res) => {
        if(res.data){
          toast.update(idToast, {
            render: 'Connexion réussie',
            type: 'success',
            autoClose: toastTimer,
            position: 'top-right',
            icon: '👍',
            isLoading: false,
            closeOnClick: true
          })
          localStorage.setItem(localStorageConstant.ADMIN_JWT_TOKEN_KEY, res.data.token)
          localStorage.setItem(localStorageConstant.ADMIN_JWT_REFRESH_TOKEN_KEY, res.data.refreshToken)
          authAdmin.setAdmin(res.data)
          dispatch(setAuth(res.data))
          setTimeout(() => {
            navigate('/', {replace: true})
          }, 2000)
        }
      }).catch((err) => {
        console.log(err)
        if(err.response.data.toString().includes('CSRF')){
          toast.update(idToast, {
            render: 'Erreur de connexion, veuillez réessayer',
            type: 'error',
            autoClose: 5000,
            position: 'top-right',
            icon: '🤔',
            isLoading: false,
            closeOnClick: true
          })

        } else {
          toast.update(idToast, {
            render: err.response.data,
            type: 'error',
            autoClose: toastTimer,
            position: 'top-right',
            icon: '🤔',
            isLoading: false,
            className: 'rotateY animated',
          })
        }
        localStorage.clear()
        dispatch(setAuth(null))
        csrf.getCsrfToken()
      })
    }
  }
  return(
    <>
      <form method={'POST'} className={'container-form'}>
        <div className={"div-input"}>
          <input
            type={'email'}
            placeholder={'Email'}
            value={admin.mail}
            autoComplete={'email'}
            onChange={(e) => {handleChange(e,'mail')}}
            required
          />
          <label>
            <i className="ph-bold ph-envelope"></i>
          </label>
        </div>
        <div className={'div-input'}>
        <input
          type={'password'}
          placeholder={'Mot de passe'}
          value={admin.mdp}
          autoComplete={'current-password'}
          onChange={(e) => {handleChange(e,'mdp')}}
          required
        />
        <label>
          <i className="ph-bold ph-lock-key"></i>
        </label>
        </div>
        <button
          className={'button-login'}
          type={'submit'}
          onClick={handleSubmit}
        >
          Connexion
        </button>
      </form>
    </>
  )
}

export default FormLogin;