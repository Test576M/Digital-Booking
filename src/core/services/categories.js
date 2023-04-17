import { getReqCategories } from "./axios";

export async function getAllCategories() {
    try {
        const response = await getReqCategories();
        const categories = response;
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}


