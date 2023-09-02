import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/product/Detail';
import { GET_PRODUCT } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import { ProductType } from '../../types/productType';

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<{ product: ProductType }>(
    [QueryKeys.PRODUCTS, id],
    () => graphqlFetcher<{ product: ProductType }>(GET_PRODUCT, { id })
  );
  if (!data) return null;

  return (
    <div>
      <h2>상품상세</h2>
      <ProductDetail item={data.product} />
    </div>
  );
};

export default ProductDetailPage;
