import { ProductType } from '../../types/productType';
import ProductItem from './Item';

interface ProductListPropsType {
  list: ProductType[];
}

const ProductList = ({ list }: ProductListPropsType) => (
  <ul className="products">
    {list.map((product) => (
      <ProductItem {...product} key={product.id} />
    ))}
  </ul>
);

export default ProductList;
