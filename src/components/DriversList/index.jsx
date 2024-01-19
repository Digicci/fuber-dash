import './driversList.scss'
import DriversItem from "../DriversItem/index.jsx";
function DriversList(){
  return (
    <>
      <div className={'list'}>
        <h4>
          Chauffeurs
          <i className={"ph-bold ph-dots-three"}></i>
        </h4>
        <div className={'driver-list'}>
          <DriversItem/>
          <DriversItem/>
          <DriversItem/>
          <DriversItem/>
        </div>
      </div>
    </>
  );
}

export default DriversList;