import { useEffect, useState } from 'react';
import { getList } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import PageComponent from '../common/PageComponent';

import {useSearchParams, useNavigate, Link} from 'react-router-dom'

const ListComponent = () => {
  const [serverData, setServerData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams()
  const navigate = useNavigate();
  const page = searchParam.get('page') || 1


  useEffect(() => {
    setFetching(true);
    getList({ page: page - 1, size: 10 })
      .then((data) => {
        console.log(page)
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
            className="w-1/2 p-1 rounded shadow-md border-2"
          >
            <div className="flex flex-col h-full">
              <div className="font-extrabold text-2xl p-2 w-full">
                {(page - 1) * 10 +  (index + 1)}
              </div>
              
              <div className="text-1xl m-1 p-2 w-full flex flex-col">
                <div className="w-full overflow-hidden"></div>
                <div className="bottom-0 font-extrabold bg-white">
                  <div className="text-center p-1">
                    상품ID: {product.id}
                  </div>
                  <div className="text-center p-1">
                    이름: {product.productName}
                  </div>
                  <div className="text-center p-1">가격: {product.price}</div>
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

export default ListComponent;


// setPageInfo({
//   totalPages: data.totalPages, // 페이지네이션 정보 업데이트 필요
//   totalElements: data.totalElements,
//   size: data.size,
//   number: data.number,
// });

// const [pageInfo, setPageInfo] = useState({
//   totalPages: 0,
//   totalElements: 0,
//   size: 0,
//   number: 0,
// });