import Header from "../../components/Header/Header";
import Input from "../../shared/Input/Input";
import { useState } from 'react';
import { formStateValidation } from '../../utils/formStateMapper';
import { getValidationErrors} from '../../utils/validationErrors';
import "./CreateProduct.scss";
import { useEffect } from "react";
import { getReqCategories, getReqCharacteristics, getReqCities } from "../../core/services/axios";
import Button from "../../shared/Button/Button";
import Textarea from "../../shared/Textarea/Textarea";
import axios from "axios";

export default function CreateProduct(){
    const [data,setData] = useState({});

    const handleSubmit = (e) =>{
        e.preventDefault();

        productForm.images.state[0].length > 0 ? productForm.images.isValid[1](true) : productForm.images.isValid[1](false);
        console.log(productForm.images);
        console.log(productForm);

        let productoFinal;
        const token = JSON.parse(localStorage.getItem("jwt")).jwt;
        token == null ? alert("Por favor Inicie Sesion") : null;
        console.log(token);

        !formStateValidation(productForm) ? alert("Completar producto") 
        : productoFinal = {
            id:1,
            nombre:productForm.productName.state[0],
            titulo:"--",
            descripcion:productForm.description.state[0],
            direccion:productForm.address.state[0],
            distancia:0,
            puntos:0,
            puntosTexto:"Muy bueno",
            numeroHabitacion:2,
            politicasCancelacion: productForm.cancelPolicy.state[0],
            politicasSaludSeguridad: productForm.healthAndSafety.state[0],
            politicasCasa: productForm.houseRules.state[0],
            imagenes:[{id:1},],
            reservas:[{id:1},],
            caracteristicas:[{id:1},],
            ciudad:{id:Number(productForm.city.state[0])},
            categoria:{id:Number(productForm.category.state[0])},
        };

        console.log(productoFinal);

        const crearProducto = ()=>{
            axios.post("http://13.59.110.188:8090/productos",JSON.stringify(productoFinal),{headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        }

        crearProducto();
    }

    const productForm = {
        productName:     { state: useState(), isValid: useState(false) },
        category:        { state: useState(), isValid: useState(false) },
        city:            { state: useState(), isValid: useState(false) },
        description:     { state: useState(), isValid: useState(false) },
        address:         { state: useState(), isValid: useState(false) },
        characteristics: { state: useState([]), isValid: useState(true) },
        images:          { state: useState([]), isValid: useState(false) },
        houseRules:      { state: useState(), isValid: useState(false) },
        healthAndSafety: { state: useState(), isValid: useState(false) },
        cancelPolicy:    { state: useState(), isValid: useState(false) },
    };

    const handleChangeCategorias = (e) =>{
        let categoria = e.target.value;
        productForm.category.state[1](categoria);
        productForm.category.isValid[1](true);
    }

    const handleChangeCiudades = (e) =>{
        let ciudad = e.target.value;
        productForm.city.state[1](ciudad);
        productForm.city.isValid[1](true);
    }

    const handleChangeCaracteristica = (e) =>{
        e.target.checked && !productForm.characteristics.state[0].find(es=>es==e.target.value) ? 
        productForm.characteristics.state[1]([...productForm.characteristics.state[0],e.target.value]) 
        : null;

        !e.target.checked && productForm.characteristics.state[0].find(es=>es==e.target.value) ?
        productForm.characteristics.state[1](productForm.characteristics.state[0].filter(ab=>ab!=productForm.characteristics.state[0].find(abc=>abc==e.target.value)))
        : null;
    }

    const handleChangeImagen = () =>{
        let imagen = document.getElementById("imagenInput").value;
        productForm.images.state[1]([...productForm.images.state[0],imagen]);
    }

    const handleRemoveImagen = (idImagen) =>{
        let imagen = document.getElementById(idImagen).textContent;
        productForm.images.state[1](productForm.images.state[0].filter(e=>e!=imagen));
    }

    useEffect(()=>{
        const getData = async() =>{
            const categorias = await getReqCategories();
            const ciudades = await getReqCities();
            const caracteristicas = await getReqCharacteristics();
            setData({...data,
                    categorias:categorias,
                    ciudades:ciudades,
                    caracteristicas:caracteristicas,
                    image:[],
                });
        }
        getData().catch(error=>console.log(error));
    },[]);

    return(
        <>
        <Header/>
        <div className="container">
            <h2 className="administration">Administración de productos</h2>
            <h2 className="administration">Crear Producto</h2>
            <form className="CreateProductForm">
                <div className="divcito">

                    <Input
                        id={'nombrepropiedad'}
                        placeholder={'Hotel Hermitage'}
                        type={'text'}
                        errors={getValidationErrors('text', true)}
                        label={'Nombre de la propiedad'}
                        name={'nombre'}
                        setValue={productForm.productName.state[1]}
                        setInputValidation={productForm.productName.isValid[1]}
                    />

                    <div className="selectContainer">
                        <div>
                            <label htmlFor="categorias">Seleccionar categoria</label>
                            <select name="categorias" id="categorias">
                                {data.categorias != undefined ?
                                data.categorias.map(categoria=><option onClick={handleChangeCategorias} value={categoria.id}>{categoria.titulo}</option>)
                                :null}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ciudades">Seleccionar ciudad</label>
                            <select name="ciudades" id="ciudades">
                                {data.ciudades != undefined ?
                                data.ciudades.map(ciudad=><option onClick={handleChangeCiudades} value={ciudad.id}>{ciudad.nombreCiudad} {ciudad.nombrePais}</option>)
                                :null}
                            </select>
                        </div>
                    </div>

                    <Textarea
                        id={'descripcion'}
                        placeholder={'Colocar aqui la descripcion'}
                        errors={getValidationErrors('text', true)}
                        label={'Descripcion de la propiedad'}
                        name={'descripcion'}
                        setValue={productForm.description.state[1]}
                        setInputValidation={productForm.description.isValid[1]}
                    />

                    <Input
                        id={'direccion'}
                        placeholder={'Calle siempre viva 123'}
                        type={'text'}
                        errors={getValidationErrors('text', true)}
                        label={'Direccion de la propiedad'}
                        name={'direccion'}
                        setValue={productForm.address.state[1]}
                        setInputValidation={productForm.address.isValid[1]}
                    />

                    <h3>Caracteristicas</h3>
                    <div className="characteristicsContainer">
                        {data.caracteristicas != undefined ?
                        data.caracteristicas.map(caracteristica=>{
                            return(
                                <>
                                <label className="characteristicLabel" htmlFor={caracteristica.id}>
                                    {caracteristica.nombre}
                                    <i className={caracteristica.icono}/>
                                </label>
                                <input
                                    className="characteristicInput" 
                                    type={"checkbox"} 
                                    id={caracteristica.id}
                                    name={caracteristica.nombre}
                                    value={caracteristica.id}
                                    onChange={handleChangeCaracteristica}
                                />
                                </>)
                        })
                        :null}
                    </div>

                    <div className="imagesContainer">
                        <Input 
                            id={"imagenInput"}
                            type={"text"}
                            placeholder={'www.test.com/png'}
                            label={'Ingresar URL de la imagen'}
                            name={'direccion'}
                        />
                        <Button type={"button"} classList={"button-smallest button-primary-outlined"} action={handleChangeImagen}>+</Button>
                    </div>

                    <div className="imagesLinksContainer">
                        {productForm.images.state[0] != undefined ? 
                        productForm.images.state[0].map(imagen=>{
                            return(
                                <div className="imageLink">
                                    <p id={imagen}>{imagen}</p>
                                    <Button id={imagen+"button"} type={"button"} classList={"button-smallest button-primary-outlined"} action={()=>handleRemoveImagen(imagen)}>-</Button>
                                </div>
                            )
                        })
                        :null}
                    </div>

                    <div className="politicsContainer">
                        <Textarea
                            id={'reglascasa'}
                            placeholder={'No fumar en habitacion'}
                            errors={getValidationErrors('text', true)}
                            label={'Reglas de la casa'}
                            name={'reglas de la casa'}
                            setValue={productForm.houseRules.state[1]}
                            setInputValidation={productForm.houseRules.isValid[1]}
                        />
                        <Textarea
                            id={'saludseguridad'}
                            placeholder={'No correr cerca de las mesas'}
                            errors={getValidationErrors('text', true)}
                            label={'Politicas de salud y seguridad'}
                            name={'salud y seguridad'}
                            setValue={productForm.healthAndSafety.state[1]}
                            setInputValidation={productForm.healthAndSafety.isValid[1]}
                        />
                        <Textarea
                            id={'politicacancelacion'}
                            placeholder={'Se podra cancelar una vez reservado...'}
                            errors={getValidationErrors('text', true)}
                            label={'Politica de cancelación'}
                            name={'politica de cancelacion'}
                            setValue={productForm.cancelPolicy.state[1]}
                            setInputValidation={productForm.cancelPolicy.isValid[1]}
                        />
                    </div>
                </div>
                <Button type={"button"} action={handleSubmit} classList={"button-medium button-primary-outlined"}>Crear producto!</Button>
            </form>
        </div>
        </>
    )
}