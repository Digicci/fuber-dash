import DriversList from "../../components/DriversList/index.jsx";
import './home.scss'
import OffreList from "../../components/OffreList/index.jsx";

function Home(){
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
