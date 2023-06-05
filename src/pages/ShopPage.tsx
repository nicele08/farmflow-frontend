import { onGetProducts } from '@/api/product.api';
import ManageProduct from '@/components/ManageProduct';
import ProductList from '@/components/ProductList';
import Pagination from '@/components/partials/Pagination';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { Product } from '@/types/product.type';
import { pageLimitLabels } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdPayment } from 'react-icons/md';
import { addToCart, clearCart } from '@/redux/slices/cartSlice';
import PayNow from '@/components/PayNow';

const ShopPage = () => {
  const [isPay, setIsPay] = useState(false);
  const { cart } = useAppSelector(state => state.cart);
  const [limit, setLimit] = useState(5);
  const { user } = useAppSelector(state => state.auth);
  const [currentProduct, setCurrentProduct] =
    useState<Product | null>(null);
  const [searchParams] = useSearchParams();
  const queryPage = Number(searchParams.get('page')) || 1;

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.product);
  useEffect(() => {
    dispatch(onGetProducts({ page, limit }));
  }, [page, limit]);

  useEffect(() => {
    if (
      (queryPage > 1 && products.length >= limit) ||
      queryPage < page
    ) {
      setPage(queryPage);
    }
  }, [queryPage]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const onBuy = (product: Product) => {
    dispatch(addToCart(product));
  };

  const onClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex gap-2 flex-wrap items-center justify-between pb-4">
          <div className="flex item-center gap-x-3">
            {user?.role === 'ADMIN' ? <ManageProduct /> : null}
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
            {cart.length ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsPay(true)}
                  className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
                >
                  <MdPayment className="w-4 h-4 mr-2 -ml-1" />
                  Pay Now
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                    {cart.length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Clear Cart
                </button>
              </>
            ) : null}
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
        <ProductList
          products={products}
          edit={setCurrentProduct}
          buy={onBuy}
        />
        <div className="flex items-center justify-end py-3">
          {page > 1 || products.length >= 5 ? (
            <Pagination page={page} />
          ) : null}
        </div>
      </div>
      {currentProduct && user?.role === 'ADMIN' ? (
        <ManageProduct
          product={currentProduct}
          close={() => {
            setCurrentProduct(null);
          }}
        />
      ) : null}

      {isPay ? <PayNow onClose={() => setIsPay(false)} /> : null}
    </>
  );
};

export default ShopPage;
