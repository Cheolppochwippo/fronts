import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../img/image.png"; 

const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const jwt = localStorage.getItem("jwt");
  const isLoggedIn = !!jwt;
  const isSeller = isLoggedIn && jwtDecode(jwt).role === "SELLER";
  const isAdmin = isLoggedIn && jwtDecode(jwt).role === "ADMIN";

  return (
    <nav id="navbar" className="flex bg-blue-300">
      <div className="w-4/5 bg-orange-400">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl ">
            <Link to={"/"}><img src={logo} alt="Logo" style={{ maxHeight: "100px" }} /></Link>
          </li>
          {isLoggedIn ? ( //로그인한 사용자만 출력되는 메뉴
            <>
              <li className="pr-6 text-3xl mt-10">
                <Link to={"/carts/"}>Cart</Link>
              </li>
              <li className="pr-6 text-3xl mt-10">
            <Link to={"/coupons/"}>Coupons</Link>
          </li>
            </>
            
          ) : (
            <></>
          )}
          {isSeller ? ( //seller만 보이는 메뉴
            <>
              <li className="pr-6 text-3xl mt-10">
                <Link to={"/store/"}>Store</Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {isAdmin ? ( //로그인한 사용자만 출력되는 메뉴
              <>
                <li className="pr-6 text-3xl mt-10">
                  <Link to={"/addCoupons"}>AddCoupon</Link>
                </li>
              </>

          ) : (
              <></>
          )}
         
          {/* <li className="pr-6 text-3xl mt-10">
            <Link to={"/totalOrder"}>Payments</Link>
          </li> */}
        </ul>
      </div>

      <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
      {isLoggedIn ? ( 
              <li className="pr-6 text-3xl mt-10">
                <Link to={"/member/mypage"}>Mypage</Link>
              </li>
          ) : (
            <></>
          )}
        {isLoggedIn ? (
          <div className="text-white text-3xl m-1 rounded mt-10">
            <Link to={"/member/logout"}>Logout</Link>
          </div>
        ) : (
          <div className="text-white text-3xl m-1 rounded mt-10">
            <Link to={"/member/login"}>Login</Link>
          </div>
        )}
          
      </div>
    </nav>
  );
};

export default BasicMenu;
