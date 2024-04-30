import OrderHistoryComponent from "../../components/store/OrderHistoryComponent";

const HistoryPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상점 주문 목록</div>
      <OrderHistoryComponent />
    </div>
  );
};
export default HistoryPage;
