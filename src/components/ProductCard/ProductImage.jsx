import './ProductCard.scss';


const ProductImage = ({product}) => {
    return (
        <div className="product-image">
            {product.imagenes != undefined && product.imagenes.length != 0  ? product.imagenes[0].url !=="" ? 
            <img src={product.imagenes[0].url} width="100%" height="100%"/> : null : null}
        </div>
       
    )
}
export default ProductImage;

{/* <img src={product.imagenes[0].url}/>  */}