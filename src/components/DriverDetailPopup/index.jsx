import './DriverDetailPopup.scss'
import {useDispatch, useSelector} from "react-redux";
import {getAuthUser, getDriver, getTeam} from "../../utils/store/selectors/AuthSelectors.js";
import TeamInfoTable from "../TeamInfoTable/index.jsx";
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx";
import {useEffect, useState} from "react";
import {setTeam} from "../../utils/store/slices/TeamEmployerSlice.js";
import {toast} from "react-toastify";
import {usePopupContext} from "../../utils/hook/usePopup.jsx";
import {setEntrepriseCommission} from "../../utils/store/slices/EntrepriseSlice.js";
import PropTypes from "prop-types";


function DriverDetailPopUp({driverId}) {

  const driver = useSelector(getDriver(driverId))
  const {getTeamEmployer, bannedDriver,updateDriverCommission} = useAuthAdmin()
  const dispatch = useDispatch()
  const team = useSelector(getTeam)
  const entreprise = useSelector(getAuthUser)
  const [update, setUpdate] = useState({
    commission:false,
  })

  const [entrepriseCopy, setEntrepriseCopy] = useState({...entreprise})

  useEffect(() => {
    getTeamEmployer(driver.id).then((data) => {
      dispatch(setTeam(data.data))
    })
  }, []);

  const {resetPopup} = usePopupContext()

  const banned = () => {
    bannedDriver(driver.id).then((data)=>{
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

  const toggleUpdate = (e) => {
    // L'attribut est declare `data-field` en JSX (datafield n'est pas un
    // attribut DOM valide) : on le lit via le dataset, en remontant au bouton
    // si le clic a atterri sur l'icone qu'il contient.
    const target = e.target.closest('[data-field]')
    const field = target && target.dataset.field
    if (!field) return
    let state = {...update}
    state[field] = !state[field]
    setUpdate(state)
    const entrepriseState = {...entrepriseCopy}
    if(field ===('commission')){
      entrepriseState.commission = entreprise.commission
    }
    entrepriseState[field] = entreprise[field]
    setEntrepriseCopy(entrepriseCopy)
  }

  const handleChange = (e) => {
    const field = e.target.name
    let state = {...entrepriseCopy}
    field === 'commission' ? state[field] = e.target.value.replace(',','.') : state[field] = e.target.value
    setEntrepriseCopy(state)
  }

  const updateCom = () => {

    const commission = entrepriseCopy.commission;

    if (commission == null || commission === '') {
      toast.error('La commission est vide');
      return;
    }

    const parsedCommission = Number(commission);

    if (Number.isNaN(parsedCommission)) {
      toast.error('La commission doit être un nombre valide');
      return;
    }

    updateDriverCommission(driver.id,parsedCommission).then(() => {
      dispatch(setEntrepriseCommission({
        id:driver.id,
        commission: parsedCommission
      }))
      setUpdate({
        commission: false
      })
      toast.success('La commission a bien été mise à jour',{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        icon: '👌',
      })
    }).catch(() => {
      toast.error('Une erreur est survenue',{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        icon: '❌',
      })
    })
  }

  const exclude = ['id', 'createdAt', 'updatedAt', 'employerId', 'statut', 'staff']
  return (
    <div className={'driver-details-container'}>
      <h1>
        Détail du chauffeur
      </h1>
      <div className={'details-info'}>
        <div className={'details-entreprise'}>
          {
            Object.keys(driver).map((data, index) => {
              if(exclude.includes(data)) return
              return (

                data==='commission' ? (
                    update.commission ? (
                        <>
                          <label htmlFor="">Commission: </label>
                          <input type="text" name={'commission'} value={entrepriseCopy.commission ?? ''} placeholder={entreprise.commission} onChange={handleChange} />
                          <button onClick={updateCom}><i className="ph-bold ph-check"></i></button>
                          <button data-field="commission" onClick={toggleUpdate}><i className="ph-bold ph-x"></i></button>
                        </>
                    ) : (
                        <p key={index}>
                      <strong>{
                          data[0].toUpperCase() + data.substring(1)
                      } : </strong>
                      {
                        driver[data]
                      }
                      <button className={'button-update'}><i className="ph-bold ph-pencil" data-field="commission" onClick={toggleUpdate}></i></button>
                    </p>)
                ) : (
                    <p key={index}>
                      <strong>{
                          data[0].toUpperCase() + data.substring(1)
                      } : </strong>
                      {
                        driver[data]
                      }
                      {data === 'commission' &&
                          <button className={'button-update'}><i className="ph-bold ph-pencil" data-field="commission" onClick={toggleUpdate}></i></button>
                      }
                    </p>
                )
              )

            })
          }
        </div>
        <div className={'details-team'}>
          <table>
            <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Adresse</th>
              <th>Numéro de téléphone</th>
              <th>E-mail</th>
              <th>Code postal</th>
              <th>Ville</th>
            </tr>
            </thead>
            <tbody>
            {team && Array.isArray(team) && team.length > 0 ? team.map((item, index) => {
              console.log(team)
              return (
                <TeamInfoTable key={index} item={item}/>
              )
            }) : <tr>
              <td colSpan="7">Il y a pas d&apos;équipe inscrit</td>
            </tr>}
            </tbody>
          </table>
        </div>
        <div className={'div-button-delete'}>
          <button
            className={'button-delete'}
            type={'submit'}
            onClick={banned}
          >
            <i className={'ph-bold ph-x'}></i>
          </button>
        </div>
      </div>
    </div>
  );
}


DriverDetailPopUp.propTypes = {
  driverId: PropTypes.any,
}

export default DriverDetailPopUp;