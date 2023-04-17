import "./Header.scss"
import Logo from "../../shared/Logo/Logo";
import HeaderButtons from "./HeaderButtons/HeaderButton";
import HeaderUserAvatar from "./HeaderUserAvatar/HeaderUserAvatar";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [logged, setLogged] = useState(false);

    useEffect(()=>{
        localStorage.getItem("jwt") ? setLogged(true) : setLogged(false);
    });

    return (
        <div className="header header-container">
            <Link to="/">
                <Logo />
            </Link>
            <div className="header-items">
                {logged ? <HeaderUserAvatar logout={setLogged}/> : <HeaderButtons />}
            </div>
        </div>
    )
} 

export default Header;
