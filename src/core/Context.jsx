import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const Context = createContext();

export const DataProvider = ({children})=>{
    const [user, setUser] = useState({});
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);


    const getCategories = async () => {
        try {
            const response = await fetch("http://13.59.110.188:8090/categorias");
            const data = await response.json();
            localStorage.setItem("CURRENT_CATEGORIES", JSON.stringify(data));
            setCategories(data);
        } catch (error) {
            localStorage.setItem("CURRENT_CATEGORIES", JSON.stringify([]));
            setCategories([]);
        }
    }

    const getProducts = async () => {
        try {
            const response = await fetch("http://13.59.110.188:8090/productos");
            const data = await response.json();
            localStorage.setItem("CURRENT_PRODUCTS", JSON.stringify(data));
            setProducts(data);
        } catch (error) {
            localStorage.setItem("CURRENT_PRODUCTS", JSON.stringify([]));
            setProducts([]);
        }
    }

    const getCities = async () => {
        try {
            const response = await fetch("http://13.59.110.188:8090/ciudades");
            const data = await response.json();
            localStorage.setItem("CURRENT_CITIES", JSON.stringify(data));
            setLocations(data);
        } catch (error) {
            localStorage.setItem("CURRENT_CITIES", JSON.stringify([]));
            setLocations([]);
        }
    }


    
    // useEffect (()=>{
    //     const userStorage = JSON.parse(sessionStorage.getItem("CURRENT_USER"));
    //     const categoriesStorage = JSON.parse(localStorage.getItem("CURRENT_CATEGORIES"));
    //     setUser(userStorage);
    //     if (categoriesStorage && categoriesStorage.length) {
    //         setCategories(categoriesStorage)
    //     } else {
    //         getCategories();
    //     }
    // },[]);

    return(
        <Context.Provider value ={{user, setUser, categories, setCategories, products, setProducts, locations, setLocations }}>{children}</Context.Provider>
    )
}