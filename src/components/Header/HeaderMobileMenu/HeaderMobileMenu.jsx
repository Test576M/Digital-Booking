import { useState } from "react";
import HamburgerIcon from "../../../shared/Icons/HamburgerIcon";
import SideNav from "../SideNav/SideNav";
import './HeaderMobileMenu.scss';


//Creación del icono hamburger con la finalidad de acceder a las opciones de registro y login en vista MOBILE

export default function HeaderMobileMenu() {
    const [closeSideNav, setCloseSideNav] = useState(true);

    const toggleSidePanel = () => {
        setCloseSideNav(!closeSideNav);
    }

    return (
        <div className="header-menu">
            <div onClick={toggleSidePanel}>
                <HamburgerIcon />
            </div>
            {closeSideNav ? null : <SideNav close={toggleSidePanel}/>}
        </div>
    )
}
