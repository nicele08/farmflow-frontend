import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '@/types/product.type';
import { MdPayment } from 'react-icons/md';
import { onAddOrder } from '@/api/order.api';
import { useNavigate } from 'react-router-dom';
import { calculateProductQuantity } from '@/utils/helpers';
import { clearCart } from '@/redux/slices/cartSlice';

const PayNow = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAppSelector(state => state.auth);
  const { loading } = useAppSelector(state => state.order);
  const [products, setProducts] = useState<Product[]>([]);
  const [landSize, setLandSize] = useState('');
  const { cart } = useAppSelector(state => state.cart);
  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));

    if (name === 'landSize') {
      setLandSize(value);
      calculateProductQuantities(Number(value));
    } else if (Number(name)) {
      const quantity = Number(value);
      setProducts(prevState =>
        prevState.map(product => {
          if (product.id === Number(name)) {
            return {
              ...product,
              quantity: quantity || 0,
            };
          }
          return product;
        }),
      );
    }
  };

  const calculateProductQuantities = useCallback(
    (currentLandSize: number) => {
      if (!cart.length) return;
      const calculatedProducts: Product[] = [];

      cart.forEach(product => {
        const { quantity } = calculateProductQuantity(
          currentLandSize,
          product,
        );
        calculatedProducts.push({ ...product, quantity });
      });
      setProducts(calculatedProducts);
    },
    [cart],
  );

  const validateProducts = useCallback(() => {
    const errs: Record<string, string> = {};
    products.forEach(product => {
      const { quantity, maxQuantity } = calculateProductQuantity(
        Number(landSize),
        product,
      );
      if (
        maxQuantity < product.quantity ||
        product.quantity < quantity
      ) {
        errs[
          product.id
        ] = `Quantity should be between ${quantity} and ${maxQuantity}`;
      }
    });
    setErrors(prev => ({
      ...prev,
      ...errs,
    }));
    return errs;
  }, [products]);

  const onPay = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.id) {
      toast.error('Please login to continue');
      navigate('/logout');
      return;
    }
    if (!Number(landSize)) {
      return toast.error('Please enter land size');
    }

    if (Object.keys(validateProducts()).length) {
      return;
    }

    const results = await Promise.allSettled(
      products.map(product =>
        dispatch(
          onAddOrder({
            farmerId: user.id,
            productId: product.id,
            quantity: product.quantity,
            isPaid: true,
            landSize: Number(landSize),
            status: 'PENDING',
          }),
        ),
      ),
    );

    const success = results.every(
      result => result.status === 'fulfilled',
    );

    if (success) {
      toast.success('Order placed successfully');
      onClose();
      dispatch(clearCart());
    }
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 flex w-screen bg-gray-600 bg-opacity-60 overflow-hidden flex-col items-end h-[calc(100%)] max-h-full`}
    >
      <div className="w-full h-full overflow-y-auto bg-white max-w-md shadow dark:bg-gray-700">
        <button
          type="button"
          disabled={loading}
          className="absolute top-3 right-8 text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-hide="authentication-modal"
          aria-label="Close"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="flex flex-col px-2 sm:px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Pay Now
          </h3>
          <form className="space-y-6" onSubmit={onPay}>
            <div>
              <label
                htmlFor="landSize"
                className="col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Land size(Acre)
              </label>
              <input
                type="text"
                name="landSize"
                id="landSize"
                value={landSize}
                onChange={handleChangeInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter land size here"
              />
            </div>
            {products.map(productData => (
              <div
                key={productData.id}
                className="grid gap-2 grid-cols-4"
              >
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={productData.name}
                    disabled
                    className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Maize"
                  />
                </div>
                <div>
                  <label
                    htmlFor={productData.id.toString()}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Qty(Kg)
                  </label>
                  <input
                    type="text"
                    name={productData.id.toString()}
                    id={productData.id.toString()}
                    value={productData.quantity}
                    onChange={handleChangeInput}
                    placeholder="1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price(RWF)
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={productData.price}
                    disabled
                    placeholder="500"
                    className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <p className="mt-1 col-span-full text-red-500 dark:text-red-600">
                  {errors[productData.id]}
                </p>
              </div>
            ))}

            <div className="flex items-center gap-x-10">
              <button
                type="submit"
                disabled={loading}
                className="disabled:cursor-not-allowed text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
              >
                <MdPayment className="w-4 h-4 mr-2 -ml-1" />
                Pay Now
                <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {cart.length}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayNow;
