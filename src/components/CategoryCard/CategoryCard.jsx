import Card from '../../shared/Card/Card';
import './CategoryCard.scss';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';




const CategoryCard = ({ category }) => {


   return (
      <Link to={"/category/"+category.id}>
         <Card classList={'card-category'}>
            <img className="card-category-image" src={category.url}  />
           <div className="card-category-content">
               <h3>{category.descripcion}</h3>

            </div>
         </Card>
      </Link>
   );
};

export default CategoryCard;


 