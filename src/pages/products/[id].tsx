import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/product/Detail';
import { GET_PRODUCT, ProductType } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const ProductDetailPage = () => {
  const { id } = useParams<'id'>();
  const { data } = useQuery<ProductType>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher<ProductType>(GET_PRODUCT, { id })
  );

  if (!data) return null;

  return (
    <div>
      <h2>상품상세</h2>
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductDetailPage;
