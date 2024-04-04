import './driversList.scss'
import DriversItem from "../DriversItem/index.jsx";
import {useSelector} from "react-redux";
import {getEntreprise} from "../../utils/store/selectors/AuthSelectors.js";

function DriversList(){
  const entreprise = useSelector(getEntreprise)
  return (
    <>
      <div className={'list'}>
        <h4>
          Chauffeurs
        </h4>
        <div className={'driver-list'}>
          {entreprise.length > 0 ? entreprise.map((item, index) =>{
            return(
              <DriversItem key={index} item={item}/>
            )
          }): <p>Il y a pas de chauffeurs inscrits</p>}
        </div>
      </div>
    </>
  );
}

export default DriversList;