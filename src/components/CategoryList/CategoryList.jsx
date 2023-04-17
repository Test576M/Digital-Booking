
import { getAllCategories } from '../../core/services/categories';
import { useState, useEffect } from 'react';
import './CategoryList.scss';


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
 
    useEffect(() => {
       async function fetchData() {
          const result = await getAllCategories();
          setCategories(result.data);
       }
       fetchData();
    }, []);
 
    return (
       <div className="category-list">
          {categories.map((category, index) => (
             <CategoryCard key={index} category={category} />
          ))}
       </div>
    );
 };
 
 export default CategoryList;