import ArrowBackIcon from '../../shared/Icons/ArrowBackIcon'
import './BookingHeader.scss'

const BookingHeader = ({product}) => {
  return (
    <div className="BookingHeader">
    <h3>{product.categoria.titulo}</h3>
    <a href="/" ><ArrowBackIcon /></a>
    <h1>{product.nombre}</h1>
    </div>
  )

}
// title={product.info.title} category={product.info.category}
export default BookingHeader