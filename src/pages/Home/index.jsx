import DriversList from "../../components/DriversList/index.jsx";
import './home.scss'

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
            </div>
        </>
    )
}

export default Home;
