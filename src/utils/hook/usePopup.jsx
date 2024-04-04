import {createContext,useContext,useState} from "react";

const PopupContext = createContext()

export const usePopupContext = () => {
  return useContext(PopupContext)
}

const ConsumePopupContext = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [popUp, setPopUp] = useState({})

  const definePopup = (children) =>{
    setPopUp(children)
  }

  const resetPopup = () => {
    setPopUp({})
    setIsOpen(false)
  }
  const openPopup = () => {
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }


  return {
    definePopup,
    resetPopup,
    openPopup,
    closePopup,
    popUp,
    isOpen
  }
}



const ProvidePopupContext = ({children}) => {

  const context = ConsumePopupContext()

  return <PopupContext.Provider value={context}>
    {children}
  </PopupContext.Provider>
}


export default ProvidePopupContext;