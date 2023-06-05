import OrderList from '@/components/OrderList';
import Pagination from '@/components/partials/Pagination';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { pageLimitLabels } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onGetOrders } from '@/api/order.api';

const OrderPage = () => {
  const [limit, setLimit] = useState(5);
  const [searchParams] = useSearchParams();
  const queryPage = Number(searchParams.get('page')) || 1;

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(state => state.order);
  useEffect(() => {
    dispatch(onGetOrders({ page, limit }));
  }, [page, limit]);

  useEffect(() => {
    if (
      (queryPage > 1 && orders.length >= limit) ||
      queryPage < page
    ) {
      setPage(queryPage);
    }
  }, [queryPage]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex gap-2 flex-wrap items-center justify-between pb-4">
        <div className="flex item-center gap-x-3">
          <select
            value={limit}
            onChange={e => {
              setLimit(Number(e.target.value));
            }}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {pageLimitLabels.map(item => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for product"
          />
        </div>
      </div>
      <OrderList orders={orders} />
      <div className="flex items-center justify-end py-3">
        {page > 1 || orders.length >= 5 ? (
          <Pagination page={page} />
        ) : null}
      </div>
    </div>
  );
};

export default OrderPage;
