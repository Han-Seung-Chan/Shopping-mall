import { ProductType } from '../../graphql/products';

interface ProductDetailPropsType {
  item: ProductType;
}

const ProductDetail = ({ item }: ProductDetailPropsType) => {
  const { title, imageUrl, description, price } = item;

  return (
    <div className="product-detail">
      <p className="product-detail__title">{title}</p>
      <img className="product-detail__image" src={imageUrl} />
      <p className="product-detail__description">{description}</p>
      <span className="product-detail__price">${price}</span>
    </div>
  );
};

export default ProductDetail;
