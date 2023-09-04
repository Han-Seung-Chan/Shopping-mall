import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import ProductList from '../../components/product/List';
import { GET_PRODUCTS } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import { ProductsType } from '../../types/productType';
import useIntersection from '../../hooks/useIntersection';

const ProductListPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ProductsType>(
      QueryKeys.PRODUCTS,
      ({ pageParam = '' }) =>
        graphqlFetcher<ProductsType>(GET_PRODUCTS, { cursor: pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage.products.at(-1)?.id,
      }
    );

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [intersecting]);

  return (
    <div>
      <h2>상품목록</h2>
      <ProductList list={data?.pages || []} />
      <div ref={fetchMoreRef} />
    </div>
  );
};

export default ProductListPage;
