import './popupContainer.scss'
import {usePopupContext} from "../../utils/hook/usePopup.jsx";


function PopupContainer() {

  const {
    isOpen,
    resetPopup,
    popUp,
  } = usePopupContext()

  const close = () => resetPopup()

  return (
    isOpen &&
    <div className={'popup-container'}>
      <div className={'container'}>
        <button onClick={close} className={'close-button'}>
          <i className="ph-bold ph-x closemenu"></i>
        </button>
        <div className={'content'}>
        {
            popUp
          }
        </div>
      </div>
    </div>
  );
}

export default PopupContainer;