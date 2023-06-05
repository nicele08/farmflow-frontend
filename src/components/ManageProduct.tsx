import {
  onAddProduct,
  onDeleteProduct,
  getProductById,
  onUpdateProduct,
} from '@/api/product.api';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { Category, Product } from '@/types/product.type';
import { isObjectValid } from '@/utils/helpers';

interface SelectOption {
  label: string;
  value: number;
}

const initialState = {
  name: '',
  category: '',
  price: '',
  quantity: '',
  maxPerAcre: '',
  perAcre: '',
  seedIds: [] as number[],
};

const ManageProduct = ({
  label = 'Add Product',
  product,
  close,
}: {
  label?: string;
  product?: Product | null;
  close?: () => void;
}) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const dispatch = useAppDispatch();
  const { loading, products } = useAppSelector(
    state => state.product,
  );
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({ ...initialState });
  const onClose = () => {
    setOpen(false);
    if (close) {
      close();
    }
  };
  const onChangeInput = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setProductData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onDelete = async () => {
    if (product) {
      await dispatch(onDeleteProduct(product.id));
      onClose();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> =
      {
        name: productData.name.trim(),
        category: productData.category.trim() as Category,
        price: Number(productData.price),
        quantity: Number(productData.quantity),
        maxPerAcre: Number(productData.maxPerAcre),
        perAcre: Number(productData.perAcre),
        seedIds: productData.seedIds,
      };
    if (!isObjectValid(formData)) {
      toast.error('Please fill all fields with valid data');
      return;
    }
    if (productData.category !== 'FERTILIZER') {
      productData.seedIds = [];
    }

    let payload: unknown;

    if (!product) {
      const result = await dispatch(onAddProduct(formData));
      payload = result.payload;
    } else {
      const result = await dispatch(
        onUpdateProduct({ id: product.id, product: formData }),
      );
      payload = result.payload;
    }

    if (payload) {
      setProductData({ ...initialState });
      onClose();
    }
  };

  const updateOptions = useCallback(async (seedIds: number[]) => {
    const existingOptionsIds = options.map(option => option.value);
    const newSeedIds = seedIds.filter(
      id => !existingOptionsIds.includes(id),
    );

    if (!newSeedIds.length) return;

    const results = await Promise.allSettled(
      newSeedIds.map(id => getProductById(id)),
    );

    const seedOptions: SelectOption[] = [];

    results.forEach(result => {
      if (result.status === 'fulfilled') {
        const product = result.value;
        seedOptions.push({
          label: product.name,
          value: product.id,
        });
      }
    });

    setOptions(prev => {
      const newOptions = seedOptions.filter(
        item => !prev.some(prevItem => prevItem.value === item.value),
      );
      return [...prev, ...newOptions];
    });
  }, []);

  useEffect(() => {
    if (product) {
      setOpen(true);
      setProductData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        maxPerAcre: product.maxPerAcre.toString(),
        perAcre: product.perAcre.toString(),
        seedIds: product.seedIds,
      });
      updateOptions(product.seedIds);
    }
  }, []);

  useEffect(() => {
    if (products.length) {
      setOptions(prev => {
        const newOptions = products
          .filter(item => item.category === 'SEED')
          .map(item => ({
            label: item.name,
            value: item.id,
          }))
          .filter(
            item =>
              !prev.some(prevItem => prevItem.value === item.value),
          );
        return [...prev, ...newOptions];
      });
    }
  }, [products]);

  return (
    <>
      {!product ? (
        <button
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <HiPlus className="w-4 h-4 mr-2 text-gray-400" />
          {label}
        </button>
      ) : null}

      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 ${
          open ? 'flex' : 'hidden'
        } w-screen bg-gray-600 bg-opacity-60 overflow-x-hidden flex-col items-end overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}
      >
        <div className="w-full bg-white relative max-w-md shadow dark:bg-gray-700">
          <button
            type="button"
            disabled={loading}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={productData.category}
                  name="category"
                  onChange={onChangeInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="SEED">Seed</option>
                  <option value="FERTILIZER">Fertilizer</option>
                </select>
              </div>
              <div>
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
                  onChange={onChangeInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Maize"
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
                  onChange={onChangeInput}
                  placeholder="500"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity(Kg)
                </label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={productData.quantity}
                  onChange={onChangeInput}
                  placeholder="1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="maxPerAcre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Max per Acre(Kg)
                </label>
                <input
                  type="text"
                  name="maxPerAcre"
                  id="maxPerAcre"
                  placeholder="3"
                  value={productData.maxPerAcre}
                  onChange={onChangeInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="perAcre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Per Acre(Kg)
                </label>
                <input
                  type="text"
                  name="perAcre"
                  id="perAcre"
                  value={productData.perAcre}
                  placeholder="0.5"
                  onChange={onChangeInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              {productData.category === 'FERTILIZER' ? (
                <div>
                  <label
                    htmlFor="compatibleSeeds"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Compatible Seeds
                  </label>
                  <Select
                    id="compatibleSeeds"
                    isMulti
                    value={options.filter(item =>
                      productData.seedIds.includes(item.value),
                    )}
                    onChange={value => {
                      setProductData(prev => ({
                        ...prev,
                        seedIds: value.map(item => item.value),
                      }));
                    }}
                    options={options}
                  />
                </div>
              ) : null}
              <div className="flex items-center gap-x-10">
                {product ? (
                  <button
                    disabled={loading}
                    onClick={onDelete}
                    type="button"
                    className="disabled:cursor-not-allowed w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                ) : null}
                <button
                  disabled={loading}
                  type="submit"
                  className="disabled:cursor-not-allowed w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {product ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProduct;
