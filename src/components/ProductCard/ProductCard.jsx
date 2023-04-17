import Card from '../../shared/Card/Card';
import SideMainLayout from '../../shared/Layouts/SideMainLayout';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';

const ProductCard = ({product}) => {


    return (
        <Card classList={'card-product'}>
            <SideMainLayout side={<ProductImage product={product} />} main={<ProductDescription product={product} />} />
        </Card>
    ) 
}
{/* <Card classList={'card-product'}>
<img className='card-product__image' src={product.imagenes[0]} />
<h3>{product.descripion}</h3>
</Card> */}
export default ProductCard;
