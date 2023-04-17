import './ProductPage.scss';
import Card from '../../shared/Card/Card'
import ProductPageHeader from '../../components/ProductHeaders/ProductPageHeader';
import ProductPageSubHeader from '../../components/ProductHeaders/ProductPageSubHeader';
import Book from "../../components/Book/Book"
import { useEffect, useState } from 'react';
import { getProductById } from '../../core/services/axios'
import { useParams } from 'react-router';
import Header from '../../components/Header/Header';

const ProductPage = () => {
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
        return (
            <article className='productPage'>
                <Header/>
                <Card classList={'productPage'}>   
                    <ProductPageHeader product={producto} key={producto.id}/>
                    <ProductPageSubHeader product={producto} key={producto.id}/>
                    <Card classList={'imagenes-product-page'}>
                        <div className="image-grid">
                            <div className="main-image">
                                {producto.imagenes != undefined && producto.imagenes.length != 0  ? 
                                <img src={producto.imagenes[0].url}/> : null}
                            </div>
                            <div className="sub-images">
                           
                                 
                                <img src={producto.imagenes[1].url}/>    
                                <img src={producto.imagenes[2].url}/>      
                                <img src={producto.imagenes[3].url}/>  
                                <img src={producto.imagenes[4].url}/>  
                            </div>
                        </div >
                        </Card>
                        <h1  className='productPageDescripton'>{producto.descripcion} </h1>


                        <div className='lineaProductPage'/>

                            <h2 className='extrasDescription'>Beneficios de este hospedaje:</h2>
                            <div className='beneficios'>
                                {producto.caracteristicas.map(caracteristica => (
                                <h3 className="iconos"key={caracteristica.id}> {caracteristica.nombre}  </h3> ))}                        
                            </div>
                        <div className='lineaProductPage'/>

                    <Book product={producto} key={producto.id}/>

                </Card>
            </article>
    );
}}
export default ProductPage;