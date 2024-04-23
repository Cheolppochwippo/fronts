import { useEffect, useState } from "react";
import { getOne } from "../../api/productsApi";
import { API_SERVER_HOST } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { addToCart } from "../../api/cartApi";
import { useNavigate } from "react-router-dom";

const host = API_SERVER_HOST;

const ReadComponent = ({ productId }) => {
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
  const jwt = localStorage.getItem("jwt");
  const isLoggedIn = !!jwt;

  useEffect(() => {
    setFetching(true);
    getOne(productId)
    .then((data) => {
      console.log(data);
      setProduct(data.data);
      setFetching(false);
    })
    .catch((error) => {
      console.error(error);
      setFetching(false);
    });
  }, [productId]);

  const handleClickAddCart = () => {
    if (!isLoggedIn) {
      navigate("/member/login");
      return;
    } else {
      let addedItem = cartItems.filter(
          (item) => item.productId === parseInt(productId)
      )[0];

      if (addedItem) {
        if (
            window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false
        ) {
          return;
        }
        addToCart(productId, addedItem.qty + quantity)
        .then((data) => {
          console.log("Add to cart success:", data);
          if (
              window.confirm(
                  "장바구니에 상품이 추가되었습니다. \n장바구니 페이지로 이동하시겠습니까?"
              )
          ) {
            navigate("/carts/list");
          }
        })
        .catch((error) => {
          console.error("Add to cart error:", error);
          // 에러 처리
        });
      } else {
        addToCart(productId, quantity)
        .then((data) => {
          console.log("Add to cart success:", data);
          //alert("상품이 장바구니에 담겼습니다.");
          if (
              window.confirm(
                  "장바구니에 상품이 추가되었습니다. \n장바구니 페이지로 이동하시겠습니까?"
              )
          ) {
            navigate("/carts/list");
          }
        })
        .catch((error) => {
          console.error("Add to cart error:", error);
          // 에러 처리
        });
      }
    }
  };

  return (
      <div className="border-2 border-sky-200 mt-10 m-2 p-4">
        {fetching ? <FetchingModal /> : <></>}
        <div className="flex justify-center mt-10">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">제품 사진</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                  <img
                      src={product.imageUrls[0]}
                      alt={product.productName}
                      className="w-full h-auto"
                  />
              ) : (
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    No Image
                  </div>
              )}
            </div>
          </div>
        </div>
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
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">수량</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <button
              type="button"
              className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-green-500"
              onClick={handleClickAddCart}
          >
            장바구니 담기
          </button>
          <button
              type="button"
              className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
              onClick={moveToList}
          >
            즉시 구매하기
          </button>
        </div>
      </div>
  );
};

export default ReadComponent;
