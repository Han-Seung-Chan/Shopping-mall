import { ProductType } from '../../types/productType';
import AdminItem from './item';

const AdminList = ({
  list,
  editingIndex,
  startEdit,
  doneEdit,
}: {
  list: {
    products: ProductType[];
  }[];
  editingIndex: number | null;
  startEdit: (index: number) => () => void;
  doneEdit: () => void;
}) => (
  <ul className="products">
    {list.map((page) =>
      page.products.map((product, i) => (
        <AdminItem
          {...product}
          key={product.id}
          isEditing={editingIndex === i}
          startEdit={startEdit(i)}
          doneEdit={doneEdit}
        />
      ))
    )}
  </ul>
);

export default AdminList;
