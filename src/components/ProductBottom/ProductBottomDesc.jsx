import {product} from "../../pages/Product/ProductPage"


const ProductBotttomDesc = () => {



    return(
        <div className="product-bottom-desc">
            <h1 encabezado={"uno de los" + product.info.category + "mas bellos de la zona"}></h1>
            <h2 description={product.info.description} ></h2>
        </div>
    )
}

export default ProductBotttomDesc;