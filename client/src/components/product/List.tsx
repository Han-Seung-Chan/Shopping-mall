import { ProductType } from '../../types/productType';
import ProductItem from './Item';

interface ProductListPropsType {
  list: { products: ProductType[] }[];
}

const ProductList = ({ list }: ProductListPropsType) => (
  <ul className="products">
    {list.map((page) =>
      page.products.map((product) => (
        <ProductItem {...product} key={product.id} />
      ))
    )}
  </ul>
);

export default ProductList;
