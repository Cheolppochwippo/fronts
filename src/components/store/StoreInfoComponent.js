import { useEffect, useState } from "react";
import {viewStore} from "../../api/storeApi";
import {getIssued} from "../../api/issuedApi";
const StoreInfoComponent = () => {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIssued()
    .then(() => {
      setStore(viewStore);
      console.log(store)
      console.log(viewStore)
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
      <div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">매장명</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {store.storeName}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">매장 설명</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {store.storeInfo}
            </div>
          </div>
        </div>
      </div>
  );

};

export default StoreInfoComponent;


