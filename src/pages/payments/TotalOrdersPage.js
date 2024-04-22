import CartItemComponent from "../../components/cart/CartItemComponent";
import TotalOrdersComponent from "../../components/payment/TotalOrderListComponent"

const TotalOrdersPage = () => {
  return (
    
      <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      
          <TotalOrdersComponent />
      </div>
  );
};

export default TotalOrdersPage;
