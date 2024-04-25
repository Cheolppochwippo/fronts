import { useEffect, useState } from "react";
import { deleteProduct, getOne } from "../../api/productsApi";
import { API_SERVER_HOST } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { addToCart } from "../../api/cartApi";
import { useNavigate } from 'react-router-dom';

const host = API_SERVER_HOST;

const StoreReadComponent = ({ productId }) => {
  const initState = {
    productId: 0,
    productName: "",
    info: "",
    realPrice: 0,
    price: 0,
    discount: 0,
    quantity: 0,
    storeName: "",
    storeInfo: "",
  };
  const navigate = useNavigate();
  const [product, setProduct] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const { changeCart, cartItems } = useCustomCart();
  const { loginState } = useCustomLogin();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setFetching(true);
    getOne(productId)
      .then((data) => {
        setProduct(data.data);
        setFetching(false);
      })
      .catch((error) => {
        console.error(error);
        setFetching(false);
      });
  }, [productId]);

  const handleClickModify = () => {
    navigate(`/store/modify/${productId}`);
  };

  const handleClickDelete = async () => {
    try {
      await deleteProduct(productId);
      alert("상품이 삭제되었습니다.");
      navigate('/store/list'); 
    } catch (error) {
      console.error("상품 삭제 실패:", error);
      alert("상품 삭제에 실패했습니다.");
    }
  };
  const handleClickAddCart = () => {
    let addedItem = cartItems.filter(
      (item) => item.productId === parseInt(productId)
    )[0];

    if (addedItem) {
      if (window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false) {
        return;
      }
      addToCart(productId, addedItem.qty + quantity)
        .then((data) => {
          console.log("Add to cart success:", data);
          // 필요한 경우 추가 작업 수행
        })
        .catch((error) => {
          console.error("Add to cart error:", error);
          // 에러 처리
        });
    } else {
      addToCart(productId, quantity)
        .then((data) => {
          console.log("Add to cart success:", data);
          // 필요한 경우 추가 작업 수행
        })
        .catch((error) => {
          console.error("Add to cart error:", error);
          // 에러 처리
        });
    }
  };


  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제품 ID</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.id}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제품명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.productName}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">가격</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.price}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">설명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.info}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">할인</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.discount}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">수량</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.quantity}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">매장명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.storeName}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">매장 설명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.storeInfo}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickModify}
        >
          수정
        </button>
        <button type="button" 
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-green-500"
          onClick={handleClickDelete}
        >
          삭제
        </button>
        {/* <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={moveToList}
        >
          List
        </button> */}
      </div>
    </div>
  );
};

export default StoreReadComponent;
