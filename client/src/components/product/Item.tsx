import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../queryClient';
import { ADD_CART } from '../../graphql/cart';
import { ProductType } from '../../types/productType';

const ProductItem = ({ id, imageUrl, price, title }: ProductType) => {
  const { mutate: addCart } = useMutation((id: string) =>
    graphqlFetcher(ADD_CART, { id })
  );

  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        <img className="product-item__image" src={imageUrl} />
        <span className="product-item__price">${price}</span>
      </Link>
      <button className="product-item__add-cart" onClick={() => addCart(id)}>
        담기
      </button>
    </li>
  );
};

export default ProductItem;
