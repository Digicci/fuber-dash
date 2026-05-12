import { useState} from "react";
import {NavLink} from "react-router-dom";
import './navBar.scss';
import {useAuthAdmin} from "../../utils/hook/useAuthAdmin.jsx";


function NavBar(){
    const {signout} = useAuthAdmin()
    const [isOpen,setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }


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
                    <NavLink className={"navLink"} to={'/finance'}>
                        Finance
                    </NavLink>
                    <NavLink className={"navLink"} to={'/stripe'}>
                        Stripe
                    </NavLink>
                    <button className={`logout `} onClick={signout}>Déconnexion</button>
                </div>
            </div>
        </>
    )
}

export default NavBar;