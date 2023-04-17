import LocationIcon from '../../shared/Icons/LocationIcon'
import './ProductPageHeadersStyless.scss'

//aca hay un icono que es el LocationIcon pero no sé ve porque falta arreglar el opacity en los styles
const ProductPageHeader = ({product}) => {
  return (
    <div className="productPageSubHeader">
    <h3><LocationIcon/>{product.ciudad.nombreCiudad}, {product.ciudad.nombrePais}</h3>
    
    <h3>A {product.distancia} Metros de distancia al centro</h3>
    <div className='productSHRate'> </div>
    </div>
  )

}
// location={product.info.location} distance={product.info.distance} textRate={product.info.textRate} points={product.info.points}
export default ProductPageHeader
