import './adhesion.scss'
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setEntreprise} from "../../utils/store/slices/EntrepriseSlice.js";
import AdhesionList from "../../components/AdhesionList/index.jsx";

function Adhesion() {
  const {getEntreprises} = useAuthAdmin()
  const dispatch = useDispatch()

  useEffect(() => {
    getEntreprises().then((data) => {
      console.log(data)
      dispatch(setEntreprise(data.data))
    })
  }, []);
  return (
    <>
     <div className={'container-adhesion'}>
       <div className={'title-adhesion'}>
         <h1>
           Adhésion
         </h1>
       </div>
       <AdhesionList/>
     </div>
    </>
  );
}

export default Adhesion;