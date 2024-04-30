import React, { useState } from 'react';
import { addProduct } from "../../api/productsApi";

const AddComponent = () => {
  const [productName, setProductName] = useState('');
  const [info, setInfo] = useState('');
  const [realPrice, setRealPrice] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleClickAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await addProduct({ productName, info, realPrice, price, discount, quantity });
      console.log(response);
      alert('상품이 성공적으로 등록되었습니다.');
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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
              value={info}
              onChange={(e) => setInfo(e.target.value)}
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
              value={realPrice}
              onChange={(e) => setRealPrice(e.target.value)}
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
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Quantity</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {/* <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div> */}
        </div>
        <div className="flex justify-end">
          <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
            <button
              type="submit"
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            >
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddComponent;
