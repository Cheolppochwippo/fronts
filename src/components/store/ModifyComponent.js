import React, { useState, useEffect } from 'react';
import { getOne, updateProduct } from "../../api/productsApi";
import { useNavigate } from 'react-router-dom';

const ModifyComponent = ({ productId }) => {
  const initState = {
    productId: 0,
    productName: '',
    info: '',
    realPrice: 0,
    price: 0,
    discount: 0,
    quantity: 0,
    storeName: '',
    storeInfo: '',
  };

  const navigate = useNavigate();
  const [product, setProduct] = useState(initState);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getOne(productId);
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleClickAdd = async (e) => {
    e.preventDefault();
    try {
      const data = {
        productName: product.productName,
        info: product.info,
        realPrice: parseInt(product.realPrice),
        discount: parseInt(product.discount),
      };
      const response = await updateProduct(productId, data);
      console.log(response);
      alert("상품이 수정되었습니다.");
      navigate('/store/list'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <form onSubmit={handleClickAdd}>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="productName"
              type="text"
              value={product.productName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Info</div>
            <textarea
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
              name="info"
              rows="4"
              value={product.info}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Real Price</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="realPrice"
              type="number"
              value={product.realPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Discount</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="discount"
              type="number"
              value={product.discount}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
            <button
              type="submit"
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            >
              수정 완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyComponent;
