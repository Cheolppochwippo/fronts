import { useEffect, useState } from "react";
import {viewStore} from "../../api/storeApi";
const StoreInfoComponent = () => {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    viewStore()
    .then((st) => {
      setStore(st.data);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching coupons:", error);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="flex flex-col">
        <div className="relative mb-4 flex w-full items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">매장명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {store.storeName}
          </div>
        </div>
        <div className="relative mb-4 flex w-full items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">매장 설명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {store.info}
          </div>
        </div>
      </div>
  );

};

export default StoreInfoComponent;


