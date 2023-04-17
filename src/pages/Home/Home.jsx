import { useEffect, useState, useContext } from 'react';
import './Home.scss';
import LocationIcon from '../../shared/Icons/LocationIcon';
import Categories from '../../components/Categories/Categories';
import Recomendations from './components/Recomendations/Recomendations';
import Searcher from './components/Searcher/Searcher';
import gsap from 'gsap';
import { Context } from '../../core/Context';
import { getProductById } from '../../core/services/axios';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';




const Home = () => {

 const categoriesContext = useContext(Context);
 const citiesContext = useContext(Context);

   const searchForm = {
      place: {state: useState(null), isValid: useState(false)},
      date: {state: useState(null), isValid: useState(false)},
   }

   useEffect(() => {
      const categoriesAnimations = gsap.from('#home .categories .cards > a', {
         duration: 0.5,
         opacity: 0,
         yPercent: 20,
         stagger: 0.1,
         ease: 'power2.out',
      });

      const recomendationsAnimations = gsap.from('#home .recommendations .cards .card', {
         duration: 0.5,
         opacity: 0,
         scale: 0.6,
         stagger: 0.2,
         ease: 'power2.out',
      });
      return () => {
         recomendationsAnimations.revert();
         categoriesAnimations.revert();
      };
   }, []);

//    const productsContext = useContext(Context);

// const handleClick = async (id) => {
//    const product = await getProductById(id);
//    localStorage.setItem('productIP', product.ip);
//    window.location.href = '/product';
// }


   
   return (
      <div id="home">
         <Header/>
         <Searcher 
            setDate={searchForm.date.state[1]} 
            setPlace={searchForm.place.state[1]}
            setPlaceValidation={searchForm.place.isValid[1]} 
            setDateValidation={searchForm.date.isValid[1]} 
            typeHeadOptions={citiesContext.locations.slice(0,21)} />
         <Categories categories={categoriesContext.categories.slice(0,4)}/> 
         <Recomendations/>
      </div>
   );
};

export default Home;

// products={products} 
// products={productsContext.products.slice(0,9)} 