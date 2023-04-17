import { useEffect, useState } from "react";
import CloseIcon from "../../../shared/Icons/CloseIcon";
import SocialNetworks from "../../../shared/SocialNetworks/SocialNetworks";
import './SideNav.scss'

//funciones para mostrar boton/link a login y registro
export default function SideNav({close}) {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(true)


// HOOK useEffect parar mostrar el button/link a login y registro según sea necesario. Si uno esta posicionado en path login va a aparecer <crear cuenta>, si estra en registro aparecera <inciiar sesión> y si el endpoint no contiene ni "login" ni "register" entonces apareceran ambos buttons --------EN VISTA MOBILE
    useEffect(() => {
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('login')) {
            setShowLogin(false);
            setShowRegister(true);
        } else if (currentPage.includes('register')) {
            setShowRegister(false);
            setShowLogin(true);
        } else {
            setShowRegister(true);
            setShowLogin(true);
        }
    },[])


    return (
        <div className="side-panel">
            <div className="side-panel-header">
                <div onClick={close}>
                    <CloseIcon/>
                </div>
                <h2>Menú</h2>
            </div>
            <div className="side-panel-options">
                { showRegister ? 
                    <a href="/register"><div className="side-panel-options-item">
                        Crear Cuenta
                    </div></a> : null }
                { showLogin ?
                    <a href="/login"><div className="side-panel-options-item">
                        Iniciar Sesión
                    </div></a> : null
                }
            </div>
            <div className="side-panel-footer">
                <SocialNetworks />
            </div>
        </div>
    )
}