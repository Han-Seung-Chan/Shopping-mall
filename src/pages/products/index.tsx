import { useQuery } from 'react-query';
import { QueryKeys, fetcher } from '../../queryClient';
import ProductItem from '../../components/product/Item';
import { ProductType } from '../../types/product';

const ProductList = () => {
  const { data } = useQuery<ProductType[]>(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: 'GET',
      path: '/products',
    })
  );

  return (
    <div>
      <h2>상품목록</h2>
      <ul className="products">
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
