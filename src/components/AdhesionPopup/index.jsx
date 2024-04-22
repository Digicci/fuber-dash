import './adhesionPopup.scss';
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx";
import {usePopupContext} from "../../utils/hook/usePopup.jsx";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setEntreprise} from "../../utils/store/slices/EntrepriseSlice.js";

function AdhesionPopup({driver}) {

  const { confirmedDriver,refusedDriver, getEntreprises} = useAuthAdmin()
  const dispatch = useDispatch()
  const {
    resetPopup,
  } = usePopupContext()

  const confirmed = () => {
    confirmedDriver(driver.id).then((data)=>{
      if(data === null){
        // todo generate error's message
        toast('une erreur est survenue',{
          position: "top-right",
          autoClose:2000,
          type: 'error',
          icon: '🤔'
        })
        return
      }
      if(data.data !== 'Done'){
        // todo generate server's error message
        toast('une erreur serveur et survenue',{
          position: "top-right",
          autoClose: 2000,
          type:"error",
          icon: '🤔'
        })
        return
      }
      getEntreprises().then(({data}) => {
        dispatch(setEntreprise(data))
        toast('Modification faite avec succès',{
          position: "top-right",
          autoClose: 2000,
          type: 'success',
          icon: '👍',
        })
        resetPopup()
      }).catch(() => {
        toast('Une erreur s\'est produite',{
          position: "top-right",
          autoClose: 2000,
          type: 'error',
          icon: '👍',
        })
        resetPopup()
      })

    })

  }
  const refused = () => {
    refusedDriver(driver.id).then((data)=>{
      if(data === null){
        // todo generate error's message
        toast('une erreur est survenue',{
          position: "top-right",
          autoClose:2000,
          type: 'error',
          icon: '🤔'
        })
        return
      }
      if(data.data !== 'Done'){
        // todo generate server's error message
        toast('une erreur serveur et survenue',{
          position: "top-right",
          autoClose: 2000,
          type:"error",
          icon: '🤔'
        })
        return
      }
      resetPopup()
      toast('Modification faite avec succès',{
        position: "top-right",
        autoClose: 2000,
        type: 'success',
        icon: '👍',
      })

    })
  }
  const exclude = ['id', 'createdAt', 'updatedAt', 'employerId','statut','staff','prix','commission']

  return (
    <div className={'adhesion-details-container'}>
      <h1>
        Détail adhesion du chauffeur
      </h1>
      <div className={'adhesion-details-info'}>
        <div className={'adhesion-details-driver'}>
          {
            Object.keys(driver).map((data,index) => {
              return(
                !exclude.includes(data) &&

                <p key={index}>
                  <strong>{
                    data[0].toUpperCase() + data.substring(1)
                  } : </strong>
                  {
                    driver[data]
                  }
                </p>
              )
            })

          }
        </div>
        <div className={'button-adhesion'}>
          <button className={'button-accepter'} onClick={confirmed} type={'submit'}>Accepter</button>
          <button className={'button-refuser'} onClick={refused} type={"submit"}>Refuser</button>
        </div>
      </div>
    </div>
  );
}

export default AdhesionPopup;