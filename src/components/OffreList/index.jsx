import './offreList.scss'
import OffreItem from "../OffreItem/index.jsx";
import {useSelector} from "react-redux";
import {getOffer} from "../../utils/store/selectors/AuthSelectors.js";
function OffreList(){
  const offre = useSelector(getOffer)

  return(
    <>
      <div className={'offre'}>
        <h4>
          Offres
        </h4>
        <div className={'entete-offre'}>
          <div className={'div-title-offre'}>
            <p className={'title-offre'}>Nom offre</p>
          </div>
          <div className={'div-title-offre'}>
            <p className={'title-offre'}>Date début</p>
          </div>
          <div className={'div-title-offre'}>
            <p className={'title-offre'}>Date fin</p>
          </div>
          <div className={'div-title-offre'}>
            <p className={'title-offre'}>Code Promo</p>
          </div>
          <div className={'div-title-offre'}>
            <p className={'title-offre'}>Récurrence</p>
          </div>
          <div className={'div-title-offre'}>
            <p className={'title-offre'}>Réduction</p>
          </div>
          <div className={'div-title-offre'}>
            <p className={'title-offre'}>Cummulable</p>
          </div>
          <div className={'div-title-offre'}>
            <p className={'title-offre'}>Pourcentage</p>
          </div>
        </div>
        <div className={'offre-list'}>
          {
            offre.length > 0 ? offre.map((item, index) => {
              console.log(offre)
              return(
                <OffreItem key={index} item={item}/>
              )
            }) : <p>Il y pas d'offres ajoutées</p>
          }
        </div>
      </div>
    </>
  )
}

export default OffreList;
