import { useState , useEffect } from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { getAllProducts } from '../../../../core/services/products';


const Recomendations = () => {

   
   const [producto, setProducto] = useState([])
   const [puesto, setPuesto] = useState(false)
   

   useEffect(() => {
       async function fetchData() {
          const data =  await getAllProducts();
          setProducto(data);
            setPuesto(true)
      }
      fetchData();
  }, [])


   return (
      <section className="recommendations">
         <h2>Recomendaciones</h2>
         <article className="cards">
            {puesto ? producto&&producto.map((product) => 
            ( <ProductCard product={product} key={product.id}/>))
             : null}
         </article>
      </section>
   );
};

export default Recomendations;

/*
El Hostel IV Estaciones se encuentra en San Luis, a 8 km del hipódromo Rosendo Hernández, y ofrece un jardín. Hay estacionamiento privado disponible por un adicional
*/