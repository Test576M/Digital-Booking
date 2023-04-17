export const GET_PRODUCT_BY_ID_ENDPOINT ="/productos/:id"

export function replaceIdPlaceholder(endpoint, id){
    return endpoint.replace(":id",id);
}