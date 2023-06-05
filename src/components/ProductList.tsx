import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { removeFromCart } from '@/redux/slices/cartSlice';
import { Product } from '@/types/product.type';
import { HiShoppingCart, HiTrash } from 'react-icons/hi';

const ProductList = ({
  products,
  edit,
  buy,
}: {
  products: Product[];
  edit: (product: Product) => void;
  buy: (product: Product) => void;
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { cart } = useAppSelector(state => state.cart);

  const isInCart = (product: Product) => {
    return cart.find(item => item.id === product.id);
  };

  const allSeedIds = cart.map(product => product.id);

  function isSeedWithAllFertilizer(product: Product): boolean {
    if (product.category === 'FERTILIZER') {
      let isAllFertilizer = true;
      for (let i = 0; i < product.seedIds.length; i++) {
        if (!allSeedIds.includes(product.seedIds[i])) {
          isAllFertilizer = false;
          break;
        }
      }
      return isAllFertilizer;
    }
    return true;
  }

  const productList = products.filter(product =>
    isSeedWithAllFertilizer(product),
  );

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Product name
          </th>
          <th scope="col" className="px-6 py-3">
            Qty/Acre(Kg)
          </th>
          <th scope="col" className="px-6 py-3">
            Category
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {productList.map(product => (
          <tr
            key={product.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="w-4 p-4">{product.id}</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {product.name}
            </th>
            <td className="px-6 py-4">{product.perAcre}</td>
            <td className="px-6 py-4 lowercase first-letter:uppercase">
              {product.category}
            </td>
            <td className="px-6 py-4">RWF{product.price}</td>
            <td className="px-6 py-4">
              {user?.role === 'ADMIN' ? (
                <a
                  href={`#edit-${product.id}`}
                  onClick={() => edit(product)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              ) : (
                <>
                  {isInCart(product) ? (
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(removeFromCart(product));
                      }}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      <HiTrash className="w-5 h-5 mr-2 -ml-1" />
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => buy(product)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <HiShoppingCart className="w-5 h-5 mr-2 -ml-1" />
                      Buy now
                    </button>
                  )}
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
