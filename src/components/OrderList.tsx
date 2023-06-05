import { onUpdateOrder } from '@/api/order.api';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { Order } from '@/types/order.type';

const OrderList = ({ orders }: { orders: Order[] }) => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            ID
          </th>
          {user?.role !== 'USER' ? (
            <th scope="col" className="px-2 py-3">
              Farmer
            </th>
          ) : null}
          <th scope="col" className="px-2 py-3">
            Product name
          </th>
          <th scope="col" className="px-2 py-3">
            Quantity(Kg)
          </th>
          <th scope="col" className="px-2 py-3">
            Price
          </th>
          <th scope="col" className="px-2 py-3">
            Land size(Acre)
          </th>
          <th scope="col" className="px-2 py-3">
            Paid
          </th>
          <th scope="col" className="px-2 py-3">
            Status
          </th>
          {user?.role !== 'USER' ? (
            <th scope="col" className="px-2 py-3">
              Action
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {orders.map(
          ({
            product = {},
            isPaid,
            quantity,
            landSize,
            id,
            status,
            farmer = {},
          }) => (
            <tr
              key={id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">{id}</td>
              {user?.role !== 'USER' ? (
                <th
                  scope="row"
                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {farmer.name}
                </th>
              ) : null}
              <th
                scope="row"
                className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {product.name}
              </th>
              <td className="px-2 py-4">{quantity}</td>
              <td className="px-2 py-4">RWF{product.price}</td>
              <td className="px-2 py-4 lowercase first-letter:uppercase">
                {landSize}
              </td>
              <td className="px-2 py-4 lowercase first-letter:uppercase">
                {isPaid ? 'Yes' : 'No'}
              </td>
              <td className="px-2 py-4 lowercase first-letter:uppercase">
                {status}
              </td>
              {user?.role !== 'USER' ? (
                <td className="px-2 py-4">
                  {status === 'APPROVED' ? (
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(
                          onUpdateOrder({
                            id,
                            order: {
                              status: 'REJECTED',
                            },
                          }),
                        );
                      }}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(
                          onUpdateOrder({
                            id,
                            order: {
                              status: 'APPROVED',
                            },
                          }),
                        );
                      }}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Approve
                    </button>
                  )}
                </td>
              ) : null}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};

export default OrderList;
