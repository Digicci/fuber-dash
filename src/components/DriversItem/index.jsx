import profile from "../../assets/drivercard.webp"
import './driversItem.scss'

function DriversItem(){
  return (
    <>
      <div className={'container-item'}>
        <div className={'driver'}>
          <div className={'image'}>
            <img src={profile} alt={'Image de profile'}/>
          </div>
          <div className={'details'}>
            <p className={'text'}>Driver Description</p>
          </div>
          <div className={'details'}>
            <p className={'text'}>Driver Description</p>
          </div>
          <div className={'details'}>
            <p className={'text'}>Driver Description</p>
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