import DriversList from "../../components/DriversList/index.jsx";
import './home.scss'
import OffreList from "../../components/OffreList/index.jsx";
import {useEffect} from "react";
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx"
import { setEntreprise } from "../../utils/store/actions/AuthActions.js";
import {useDispatch} from "react-redux";

function Home(){
    const {getEntreprises} = useAuthAdmin()
    const dispatch = useDispatch()

    useEffect(() => {
        getEntreprises().then((data) => {
            dispatch(setEntreprise(data.data))
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
