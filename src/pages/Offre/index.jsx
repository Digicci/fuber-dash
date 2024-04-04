import "./offre.scss"
import OffreList from "../../components/OffreList/index.jsx";
import AddOffre from "../../components/AddOffre/index.jsx";
import {useOffer} from "../../utils/hook/useOffer.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setOffer} from "../../utils/store/slices/OfferSlice.js";
function Offre(){
  const {getOffer} = useOffer()
  const dispatch = useDispatch()

  useEffect(() => {
    getOffer().then((data) => {
      dispatch(setOffer(data.data))
    })
  }, []);
  return (
    <>
      <div className={'container-offre'}>
        <div className={'title'}>
          <h1>
            Offre
          </h1>
        </div>
        <AddOffre/>
        <OffreList/>
      </div>
    </>
  );
}

export default Offre;