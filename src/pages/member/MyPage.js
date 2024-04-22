
import MyCouponListComponent from "../../components/member/MyCouponListComponent";
import MyPageComponent from "../../components/member/MyPageComponent";
import PaymentListPageComponent from "../../components/payment/PaymentListComponent";
import TotalOrderListComponent from "../../components/payment/TotalOrderListComponent";
import BasicMenu from "../../menus/BasicMenu";


const MyPage = () => {
  return ( 
    <div className='fixed top-0 left-0 z-[1055] flex flex-col h-full w-full'>
      <BasicMenu/>
      <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
        <MyPageComponent/>
      </div> 
      <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
        <MyCouponListComponent/>
      </div>  
      <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
        <TotalOrderListComponent/>
      </div>  
      <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
        <PaymentListPageComponent/>
      </div>  
    </div>
   );
}
 
export default MyPage;
