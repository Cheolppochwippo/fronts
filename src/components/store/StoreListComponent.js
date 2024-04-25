import { useEffect, useState } from 'react';
import { getList, getStoreList } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import PageComponent from '../common/PageComponent';

import {useSearchParams, useNavigate, Link} from 'react-router-dom'

const StoreListComponent = () => {
  const [serverData, setServerData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams()
  const navigate = useNavigate();
  const page = searchParam.get('page') || 1


  useEffect(() => {
    setFetching(true);
    
    getStoreList({ page: page - 1, size: 10 })
      .then((data) => {
        setServerData(data); // productList 배열 할당
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setFetching(false);
      });
  }, [page]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {fetching ? <FetchingModal /> : <></>}
      
      <div className="flex flex-wrap mx-auto p-6">
        {serverData.map((product, index) => (
            <Link
                to={`../read/${product.id}`}
                key={product.id}
                className="w-1/2 md:w-1/5 p-1 rounded shadow-md border-2"
            >
              <div className="flex flex-col h-full">
                <div className="relative w-full h-100">
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                      <img
                          src={product.imageUrls[0]}
                          alt={product.productName}
                          className="object-cover w-full h-full"
                      />
                  ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        No Image
                      </div>
                  )}
                </div>
                <div className="font-extrabold text-2xl p-2 w-full">
                  {(page - 1) * 10 + (index + 1)}
                </div>
                <div className="text-1xl m-1 p-2 w-full flex flex-col">
                  <div className="w-full overflow-hidden"></div>
                  <div className="bottom-0 font-extrabold bg-white">
                    <div className="text-center p-1">
                      이름: {product.productName}
                    </div>
                    <div className="text-center p-1">가격: {product.price}원</div>
                  </div>
                </div>
              </div>
            </Link>
        ))}
      </div>
      <PageComponent />
    </div>
  );
};

export default StoreListComponent;


