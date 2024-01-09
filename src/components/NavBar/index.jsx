import {useState} from "react";
import {NavLink} from "react-router-dom";
import './navBar.scss';


function NavBar(){
    const [isOpen,setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    const closeMenu = () => {
        setIsOpen(false)
    }

    return(
        <>
            <div className={'container'}>
                <button className={'responsive'} onClick={toggleMenu}>
                    {!isOpen ? 'Menu' : 'Fermer'}
                </button>
                <div className={'nav'}>
                    <NavLink className={"navLink"} to={"/"}>
                        Home
                    </NavLink>
                    <NavLink className={"navLink"} to={'/offre'}>
                        Offre
                    </NavLink>
                    <NavLink className={"navLink"} to={'/adhésion'}>
                        Adhésion
                    </NavLink>
                    <NavLink className={"navLink"} to={'/abonnement'}>
                        Abonnement
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default NavBar;