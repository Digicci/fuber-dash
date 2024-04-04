import DriversList from "../../components/DriversList/index.jsx";
import './home.scss'
import OffreList from "../../components/OffreList/index.jsx";
import {useEffect} from "react";
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx"
import { setEntreprise } from "../../utils/store/slices/EntrepriseSlice.js";
import {useDispatch} from "react-redux";
import {useOffer} from "../../utils/hook/useOffer.jsx";
import {setOffer} from "../../utils/store/slices/OfferSlice.js";

function Home(){
    const {getEntreprises} = useAuthAdmin()
    const {getOffer} = useOffer()
    const dispatch = useDispatch()

    useEffect(() => {
        getEntreprises().then((data) => {
            dispatch(setEntreprise(data.data))
        })
        getOffer().then((data) => {
            console.log(data)
            dispatch(setOffer(data.data))
        })
    }, []);
    return(
        <>
            <div className={'container-home'}>
                <div className={'title'}>
                    <h1>
                        Dashboard
                    </h1>
                </div>
                <DriversList/>
                <OffreList/>
            </div>
        </>
    )
}

export default Home;
