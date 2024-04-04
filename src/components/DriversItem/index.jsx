import profile from "../../assets/drivercard.webp"
import './driversItem.scss'
import {usePopupContext} from "../../utils/hook/usePopup.jsx";
import DriverDetailPopUp from "../DriverDetailPopup/index.jsx";

function DriversItem({item}){

  const {
    definePopup,
    resetPopup,
    openPopup,
  } = usePopupContext()

  const showDetail = () => {
    resetPopup()
    definePopup(<DriverDetailPopUp driver={item}/>)
    openPopup()
  }
  return (
    <>
      <div className={'container-item'}>
        <div className={'driver'}>
          <div className={'image'}>
            <img src={profile} alt={'Image de profile'}/>
          </div>
          <div className={'details'}>
            <p className={'text'}>
              {item.nom} {item.prenom}
            </p>
          </div>
          <div className={'details'}>
            <p className={'text'}>
              {item.nom_commercial}
            </p>
          </div>
          <div className={'details'}>
            <p className={'text'}>{item.mail}</p>
          </div>
          <div className={'details'}>
            <button onClick={showDetail} className={'plus-details'}>
                <i className="ph-bold ph-dots-three-outline"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriversItem;