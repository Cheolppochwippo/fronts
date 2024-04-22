import FailPage from "../../components/payment/PaymentFailComponent";

const PaymentFailPage = () => {
  return (
      <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
        <div className="w-full flex flex-wrap h-full justify-center items-center border-2">
          <FailPage />
        </div>
      </div>
  );
};

export default PaymentFailPage;
