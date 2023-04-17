import { useEffect, useState } from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { getAllCategories } from '../../core/services/categories';



const Categories = () => {
   const [categoria,setCategoria] = useState([])



   useEffect(( )=>{
      async function fetchData() {
         const  data  = await getAllCategories();
         setCategoria(data);

       
       }
         fetchData();
   },[])

   return (
      <section className="categories">
         <h2>Buscar por tipo de alojamiento</h2>
         <article className="cards">
             {categoria&&categoria.map((category) => (
               <CategoryCard category={category}  key={categoria.id}/>
            ))} 
         </article>
      </section>
   );
};

export default Categories;

