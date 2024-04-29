import { useEffect, useState } from "react";
import { getList, searchProduct } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import PageComponent from "../common/PageComponent";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import img from "./image.png";

const ListComponent = () => {
  const [serverData, setServerData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const page = searchParam.get("page") || 1;

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      try {
        let data;
        data = await getList({ page: page - 1, size: 10 });
        setServerData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [page]);

  const handleSearchSubmit = async () => {
    setFetching(true);
    try {
      const data = await searchProduct(searchKeyword);
      setServerData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {fetching ? <FetchingModal /> : null}
      <div className="flex flex-wrap mx-auto p-6">
        <div className="w-full mb-4 flex">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
          <button
            onClick={handleSearchSubmit}
            className="bg-white hover:bg-white text-white font-bold py-2 px-4 rounded ml-2 flex items-center justify-center"
            style={{ writingMode: "horizontal-tb", textOrientation: "mixed" }}
          >
            <img src={img} alt="Search Icon" className="w-17 h-14 mr-2" />
          </button>
        </div>
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
                  <div className="text-center p-1">{product.productName}</div>
                  <div className="text-center p-1">{product.price}원</div>
                  {product.discount > 0 && (
                    <div className="text-center p-1">
                      {product.discount}원 할인 중!
                    </div>
                  )}
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
