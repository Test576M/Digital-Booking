import axios from 'axios';

const api = axios.create({
    baseURL: 'http://13.59.110.188:8090/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',

        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
})


export const getReqCategories = async () => {
    try{
        const response = await axios.get("http://13.59.110.188:8090/categorias");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getReqProducts = async () => {
    try { 
        const response = await axios.get("http://13.59.110.188:8090/productos");
        return response.data;   
    } catch (error) {
        console.log(error);
    }
}

export const getReqCharacteristics = async () => {
    try { 
        const response = await axios.get("http://13.59.110.188:8090/caracteristicas");
        return response.data;   
    } catch (error) {
        console.log(error);
    }
}

export const getReqCities = async () => {
    try{
        const response = await axios.get("http://13.59.110.188:8090/ciudades");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



export const getProductById = async (id) => { 
      try { 
        const response = await axios.get("http://13.59.110.188:8090/productos/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(id);
    }
}

export const getProductByCategoryId = async (id) =>{
    try { 
        const response = await axios.get("http://13.59.110.188:8090/productos/categorias/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(id);
    }
}

export const getUserById = async (id) => {
    try { 
        const response = await axios.get("http://13.59.110.188:8090/usuarios/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(id);
    }
}


export const postReq = async (url, body) => {
    try {
      const response = await axios.post(url, body);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }


export function getData(path, setData){
    api.get(path)
    .then(res => {
        setData(res.data);
    })
}



