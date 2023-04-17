import LocationIcon from '../../shared/Icons/LocationIcon';
import Button from '../../shared/Button/Button';
import './ProductCard.scss';
import { Link } from 'react-router-dom';


export default function ProductDescription({product}) {


     return (
      <div className="product-description">
         <div className="product-header">
            <div className="product-title">
               <h4 className="product-category">{product.categoria.titulo}</h4>
               <h1>{product.nombre}</h1>
            </div>
            <div className="product-rate">
               <div className="product-points">{product.puntos}</div>
               <span>{product.puntosTexto}</span>
            </div>
         </div>
         <div className="dproduct-location">
            <div className="product-location-map">
               <LocationIcon />
               <span><p>a</p>{product.distancia}<p>metros del centro</p></span>
               <a href="#" ><span className="product-location-map--show"> Mostrar en el mapa</span></a>
            </div>
            <div className="product-location-extras"></div>
         </div>
         <div className="product-text">{product.descripcion}</div>
         <Link to={`/product/${product.id}`}>
            <Button classList={'button-primary'}>Ver detalle</Button>
         </Link>
      </div>
   );
}
