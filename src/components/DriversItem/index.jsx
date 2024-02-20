import profile from "../../assets/drivercard.webp"
import './driversItem.scss'

function DriversItem({item}){
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
            <button className={'plus-details'}>
              <i className="ph-bold ph-dots-three-outline"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriversItem;