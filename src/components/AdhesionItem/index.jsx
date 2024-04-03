import './adhesionItem.scss'
import profile from "../../assets/drivercard.webp";
import {usePopupContext} from "../../utils/hook/usePopup.jsx";
import AdhesionPopup from "../AdhesionPopup/index.jsx";

function AdhesionItem({item}){
  const {
    definePopup,
    resetPopup,
    openPopup,
  } = usePopupContext()

  const showDetail = () => {
    resetPopup()
    definePopup(<AdhesionPopup driver={item}/>)
    openPopup()
  }

  return (
    <>
      <div className={'adhesion-item'}>
        <div className={'driver-adhesion'}>
          <div className={'image'}>
            <img src={profile} alt={'Image de profile'}/>
          </div>
          <div className={'details-adhesion'}>
            <p className={'text-adhesion'}>
              {item.nom} {item.prenom}
            </p>
          </div>
          <div className={'details-adhesion'}>
            <p className={'text-adhesion'}>
              {item.nom_commercial}
            </p>
          </div>
          <div className={'details-adhesion'}>
            <p className={'text-adhesion'}>{item.mail}</p>
          </div>
          <div className={'details-adhesion'}>
            <button onClick={showDetail} className={'plus-details-adhesion'}>
              <i className="ph-bold ph-dots-three-outline"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdhesionItem;