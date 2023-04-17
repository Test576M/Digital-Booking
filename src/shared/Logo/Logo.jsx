import LogoIcon from "../Icons/LogoIcon";
import logo from "./img/logo.png"
import "./Logo.scss";


const Logo = () => {
  return (
    <div className ="db-logo">
        <img src={logo} alt='logo'/>
        <LogoIcon/>
    </div>
  )
}

export default Logo; 
