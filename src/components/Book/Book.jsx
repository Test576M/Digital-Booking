import { useState} from "react";
import  "./Book.scss"
import Button from "../../shared/Button/Button";
import 'react-calendar/dist/Calendar.css';
// import Calendar from "react-calendar";
import Card from "../../shared/Card/Card";
import { Link } from "react-router-dom";
import { Calendar } from 'react-multi-date-picker'


const Book = ({product}) => {

   const [checkIn, setCheckIn] = useState();
   const [checkOut, setCheckOut] = useState();



   const handleCheckInChange = date => {
      setCheckIn(date);
    };

   const handleCheckOutChange = date => {
      setCheckOut(date);
    };

   const handleSubmit = () => {
      fetch('http://13.59.110.188:8090/reservas', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "fechaInicio": checkIn,
            "fechaFin": checkOut,
            "idProducto": product.id,
            "idUsuario": 1
            
         })
      });
   }




    return (

<div className="booking-block">

   <Card>
   <br/>
 
      <div className="calendar-container">

      <Calendar onChange={handleCheckInChange} value={checkIn} range rangeHover numberOfMonths={2} showOtherDays/>
      {/* <Calendar onChange={handleCheckOutChange} value={checkOut} /> */}
      
      <Button onClick={handleSubmit}  classList={'button-primary'}>Enviar</Button>
      </div>
      
   </Card>
      
   <Card> 
      <br/>
      <div className="card-info">
        <img src={product.imagenes[0].url}/>
          <h3>Agrega tus fechas de viaje para obtener precios exactos </h3>
          <Link to={`/bookPage/${product.id}`} >
            <Button classList={'button-primary'}>Reservar</Button>
            </Link>
        </div>  
   </Card>

</div>
    );
}


export default Book;

