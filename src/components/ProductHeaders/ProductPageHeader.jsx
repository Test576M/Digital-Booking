import './ProductPageHeadersStyless.scss'
import ArrowBackIcon from "../../shared/Icons/ArrowBackIcon"

const ProductPageHeader = ({product}) => {
  return (
    <div className="productPageHeader">
    <h3>{product.categoria.titulo}</h3>
    <a href="/" ><ArrowBackIcon /></a>

    </div>
  )

}
// title={product.info.title} category={product.info.category}
export default ProductPageHeader