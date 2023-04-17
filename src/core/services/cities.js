import { getReqCities } from "./axios";

export async function getAllCities() {
    try {
        const response = await getReqCities();
        const cities = response;
        return cities;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

