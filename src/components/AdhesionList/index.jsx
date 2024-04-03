import './adhesionList.scss'
import {useSelector} from "react-redux";
import {getEntreprisePending} from "../../utils/store/selectors/AuthSelectors.js";
import AdhesionItem from "../AdhesionItem/index.jsx";

function AdhesionList() {
  const entreprisePending = useSelector(getEntreprisePending)
  return (
    <>
      <div className={'list-adhesion'}>
        <h4>Liste d'adhésion</h4>
        <div className={'list-item-adhesion'}>
          {entreprisePending.length > 0 ? entreprisePending.map((item, index) => {
            return(
              <AdhesionItem key={index} item={item}/>
            )
          }) : <p> Il y a pas de chauffeurs en attente</p>

          }
        </div>
      </div>
    </>
  );
}

export default AdhesionList;