import './DriverDetailPopup.scss'
import {useDispatch, useSelector} from "react-redux";
import {getTeam} from "../../utils/store/selectors/AuthSelectors.js";
import TeamInfoTable from "../TeamInfoTable/index.jsx";
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx";
import {useEffect} from "react";
import {setTeam} from "../../utils/store/slices/TeamEmployerSlice.js";
import {toast} from "react-toastify";
import {usePopupContext} from "../../utils/hook/usePopup.jsx";


function DriverDetailPopUp({driver}) {

  const {getTeamEmployer, bannedDriver} = useAuthAdmin()
  const dispatch = useDispatch()
  const team = useSelector(getTeam)

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
      dispatch(bannedDriver(driver.id))
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
              return (
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
              <td colSpan="7">Il y a pas d'équipe inscrit</td>
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

export default DriverDetailPopUp;