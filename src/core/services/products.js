import { getReqProducts } from "./axios";

export async function getAllProducts() {
    try {
        const response = await getReqProducts();
        const products = response;
        return products;
    } catch (error) {
        console.log('Error fetching products',error);
        return [];
    } 
}