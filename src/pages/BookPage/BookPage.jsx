import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import Header from '../../components/Header/Header';
import { getProductById } from '../../core/services/axios';
import Card from '../../shared/Card/Card';
import './BookPage.scss';
import BookingHeader from '../../components/BookingHeader/BookingHeader'
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button'




const BookPage = ({product}) => {

    const params= useParams(); 
    const [ponido, setPonido] = useState (false)
    const [producto, setProducto] = useState()



    const obtenerDatos = async () => {
    const response = await getProductById(params.id);
    console.log(response);
    setProducto(response);
}

useEffect(  () =>  {
obtenerDatos();
setPonido(true);
}, []);
    
if (!producto){
    return (<div>loading ...</div>)
}else if(ponido && producto != undefined ) {

    return(
    <article>

            <Header/>
            <BookingHeader product={producto} key={producto.id}/>
    <div className='containerGeneral'>
        <div className='leftPage'>

            <h1>Completa tus datos</h1>
            <div className="completar-datos">
            <Card >
                <label>Nombre:</label>
                <input type="text" id="nombre" name="nombre" />

                <label >Apellido:</label>
                <input type="text" id="apellido" name="apellido" />
                <br/>
                <label >Correo electrónico:</label>
                <input type="email" id="email" name="email" />

                <label >Ciudad:</label>
                <input type="text" id="ciudad" name="ciudad" />
            </Card>
            </div>
            
            <h1>Seleccioná tu fecha de reserva</h1>
            <Card className="fecha-reserva">
            </Card>


            <Card className="detalle-reserva">
            </Card>

            <h1>Tu horario de llegada</h1>
            <Card className="horario-llegada">
                <h2>Tu habitación va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM</h2>
                <Input placeholder={"Seleccionar horario de llegada"}></Input>
            </Card>
        </div>


        <div className='rightPage'>
                {/* <ProductCard product={producto} key={producto.id}/> */}
                <Card>
                    <h1>Detalle de la reserva</h1>
                    <img src={producto.imagenes[0].url}/>
                    <h2>{producto.categoria.descripcion}</h2>
                    <h1>{producto.nombre}</h1>
                    <h2>{producto.puntos} {producto.puntosTexto}</h2>
                    <h2>{producto.ciudad.nombreCiudad}, {producto.ciudad.nombrePais}</h2>
                    <Button classList={'button-primary'}>Confirmar reserva</Button>
                    
                </Card>
        </div>
    </div>   

    </article>
    );
}
}

export default BookPage;