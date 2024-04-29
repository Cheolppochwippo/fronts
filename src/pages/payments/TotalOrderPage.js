import BasicMenu from "../../menus/BasicMenu";
import TotalOrderComponent from "../../components/payment/TotalOrderComponent";
import CartItemComponent from "../../components/cart/CartItemComponent";
import OrderListComponent from "../../components/products/OrderListComponent";

const TotalOrderPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <BasicMenu />
      <div className="flex-1 flex justify-start">
        <div className="w-full max-w-8xl bg-white shadow-md rounded-lg p-4 ml-0">
          <div className="p-4">
            {/* <CartItemComponent /> */}
            <OrderListComponent/>
          </div>
          <div className="p-4 bg-gray-100">
            <TotalOrderComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TotalOrderPage;
