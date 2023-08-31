import { useQuery } from 'react-query';
import ProductList from '../../components/product/List';
import { GET_PRODUCTS } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import { ProductsType } from '../../types/productType';

const ProductListPage = () => {
  const { data } = useQuery<ProductsType>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher<ProductsType>(GET_PRODUCTS)
  );

  return (
    <div>
      <h2>상품목록</h2>
      <ProductList list={data?.products || []} />
    </div>
  );
};

export default ProductListPage;
