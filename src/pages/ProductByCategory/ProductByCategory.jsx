import Header from "../../components/Header/Header";
import { useParams } from 'react-router';
import { useEffect } from "react";
import { useState } from "react";
import { getProductByCategoryId } from "../../core/services/axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductByCategory.scss";
import Categories from "../../components/Categories/Categories";
import { useContext } from "react";
import { Context } from "../../core/Context";

export default function ProductByCategory(){
    const params = useParams();
    const categoriesContext = useContext(Context);
    const [data,setData] = useState([]);

    useEffect(()=>{
        const setInfo = async() =>{
            const info = await getProductByCategoryId(params.id);
            setData(info);
        }
        setInfo();
    },[params.id])

    return(
        <>
            <Header/>
            <Categories categories={categoriesContext.categories.slice(0,4)}/>
            <section className="recommendations">
                <h2>Recomendaciones</h2>
                <article className="cards">
                    {data.map(producto=><ProductCard product={producto} key={producto.id}/>)}
                </article>
            </section>
        </>
    );
}