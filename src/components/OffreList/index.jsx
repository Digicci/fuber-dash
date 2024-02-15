import './offreList.scss'
import OffreItem from "../OffreItem/index.jsx";
function OffreList(){

  return(
    <>
      <div className={'offre'}>
        <h4>
          Offres
        </h4>
        <div className={'offre-list'}>
          <OffreItem/>
        </div>
      </div>
    </>
  )
}

export default OffreList;
