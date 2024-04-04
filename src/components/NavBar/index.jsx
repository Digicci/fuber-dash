import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import './navBar.scss';
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx";
import {useSelector} from "react-redux";
import {getAuth} from "../../utils/store/selectors/AuthSelectors.js";


function NavBar(){
    const {signout, isConnected} = useAuthAdmin()
    const auth = useSelector(getAuth)
    const [isOpen,setIsOpen] = useState(false)
    const [connected, setConnected ] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        setConnected(isConnected())
    },[auth.auth])


    return(
        <>
            <div className={'container'}>
                <button className={'responsive'} onClick={toggleMenu}>
                    {!isOpen ? 'Menu' : 'Fermer'}
                </button>
                <div className={`nav ${isOpen ? 'visible' : ''}`}>
                    <NavLink className={"navLink"} to={"/"}>
                        Home
                    </NavLink>
                    <NavLink className={"navLink"} to={'/offre'}>
                        Offre
                    </NavLink>
                    <NavLink className={"navLink"} to={'/adhesion'}>
                        Adhésion
                    </NavLink>
                    <NavLink className={"navLink"} to={'/abonnement'}>
                        Abonnement
                    </NavLink>
                    {
                        connected && <button className={`logout `} onClick={signout}>Déconnexion</button>
                    }
                </div>
            </div>
        </>
    )
}

export default NavBar;