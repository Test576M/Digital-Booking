import { useEffect } from "react";
import { useContext } from "react"
import { Context } from "../../../core/Context"
import { getUserById } from "../../../core/services/axios";
import { Link } from 'react-router-dom';
import Button from "../../../shared/Button/Button";
import "./HeaderUserAvatar.scss"

export default function HeaderUserAvatar({logout}){
    const {user, setUser} = useContext(Context);

    const handleClick = () =>{
        logout(false);
        localStorage.removeItem("jwt");
    }

    useEffect(()=>{
        const setUsuario = async () =>{
            const usuario = await getUserById(JSON.parse(localStorage.getItem("jwt")).id);
            setUser(usuario);
        }
        setUsuario();
    },[]);

    return(
        <>
        {user.rol != undefined && user.rol.id == 1 ?
            <Link to={"/createProduct"}><Button classList={"button-primary-outlined button-small"}>Crear Producto</Button></Link>
        :null}
        {user.nombre != null ?
        <div className="ContainerUserAvatar">
            <button className="ButtonLogout" onClick={handleClick}>
                x
            </button>
  
            <div className="ContainerAvatar">
            <div className="Avatar">
                <h2 className="TextAvatar">
                    {user.nombre.charAt(0).toUpperCase()}
                    {user.apellido.charAt(0).toUpperCase()}
                </h2>
            </div>
            <h3 className="TextUser">
                <span className="SpanTextUser">Hola,</span> <br />
                {user.nombre} {user.apellido}
            </h3>
            </div>
        </div>
        :null}
        </>
    )
}