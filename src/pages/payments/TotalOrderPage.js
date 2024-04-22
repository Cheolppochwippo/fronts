import BasicMenu from "../../menus/BasicMenu";
import TotalOrderComponent from "../../components/payment/TotalOrderComponent"
import CartItemComponent from "../../components/cart/CartItemComponent";

const TotalOrderPage = () => {
  return (
      <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
        <BasicMenu />
        

        <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
        
         <CartItemComponent/>
        
          <TotalOrderComponent />
        </div>
      </div>
  );
};

export default TotalOrderPage;
