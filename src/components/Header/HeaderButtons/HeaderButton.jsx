import { useEffect, useState} from "react"
import Button from "../../../shared/Button/Button";
import HeaderMobileMenu from "../HeaderMobileMenu/HeaderMobileMenu";
import './HeaderButton.scss'
import { Link } from "react-router-dom";

//funciones para mostrar boton/link a login y registro
export default function HeaderButtons() {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(true)

// HOOK useEffect parar mostrar el button/link a login y registro según sea necesario. Si uno esta posicionado en path login va a aparecer <crear cuenta>, si estra en registro aparecera <inciiar sesión> y si el endpoint no contiene ni "login" ni "register" entonces apareceran ambos buttons
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
        <div className="header-buttons"> 
            {showRegister ? <Link to="/register"><Button classList={'button-primary-outlined'} >Crear cuenta</Button></Link> : null}
            {showLogin ? <Link to="/login"><Button classList={'button-primary-outlined'} >Iniciar sesión</Button></Link> : null}
            <HeaderMobileMenu />
        </div>
    )
}

