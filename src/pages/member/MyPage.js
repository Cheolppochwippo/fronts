import MyCouponListComponent from "../../components/member/MyCouponListComponent";
import MyPageComponent from "../../components/member/MyPageComponent";
import PaymentListPageComponent from "../../components/payment/PaymentListComponent";
import TotalOrderListComponent from "../../components/payment/TotalOrderListComponent";
import BasicMenu from "../../menus/BasicMenu";
const MyPage = () => {
  return (
      <div className='fixed top-0 left-0 z-[1055] flex flex-col h-screen w-screen overflow-y-auto'>
        <BasicMenu />
        <div className="w-full max-w-screen-lg mx-auto p-4">
          <MyPageComponent />
        </div>
        <div className="w-full max-w-screen-lg mx-auto p-4">
          <MyCouponListComponent />
        </div>
        <div className="w-full max-w-screen-lg mx-auto p-4">
          <TotalOrderListComponent />
        </div>
        <div className="w-full max-w-screen-lg mx-auto p-4">
          <PaymentListPageComponent />
        </div>
      </div>
  );
}

export default MyPage;
