import React, { useState } from 'react';
import { updateStore } from "../../api/storeApi";

const UpdateComponent = () => {
  const [storeName, setStoreName] = useState('');
  const [info, setInfo] = useState('');

  const handleClickAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await updateStore({ storeName,info });
      console.log(response);
      alert('상점이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="border-2 border-sky-200 mt-10 m-2 p-4">
        <form onSubmit={handleClickAdd}>
          <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <div className="w-1/5 p-6 text-right font-bold">storeName</div>
              <input
                  className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                  name="storeName"
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
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

export default UpdateComponent;
