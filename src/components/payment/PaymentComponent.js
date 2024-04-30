import { useEffect, useRef } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";


export default function App() {
  const paymentWidgetRef = useRef(null);
  const totalOrder = JSON.parse(localStorage.getItem("addOrder"))
  const TOSS_ID = process.env.REACT_APP_TOSS_ID;
  const TOSS_PW = process.env.REACT_APP_TOSS_PW;

  useEffect(() => {
    const initializePaymentWidget = async () => {
      const paymentWidget = await loadPaymentWidget(TOSS_ID, TOSS_PW);
      paymentWidgetRef.current = paymentWidget;
      paymentWidget.renderPaymentMethods("#payment-widget", totalOrder.data["priceAmount"]);
    };

    initializePaymentWidget();
  }, []);

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget.requestPayment({
        orderId: totalOrder.data["totalOrderId"],
        orderName: totalOrder.data["orderName"],
        customerName: totalOrder.data["username"],
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="App" style={{width: '100%', height: '100%'}}>
        <h1>04/29부터 tosspayment 내부이슈로 인해 결제 위젯이 막힌 상황입니다. 양해 부탁드립니다!</h1>
        <a href="https://techchat.tosspayments.com/m/1234670227913179267">https://techchat.tosspayments.com/m/1234670227913179267</a>
        <h1>04/29부터 tosspayment 내부이슈로 인해 결제 위젯이 막힌 상황입니다. 양해 부탁드립니다!</h1>
        <div id="payment-widget"/>
        {/* 위젯 */}
        <button
            onClick={handlePayment}
            style={{
              padding: '10px 20px', // 버튼 크기 조정
              marginLeft: '20px', // 왼쪽에서 조금 떨어지도록 설정
              borderRadius: '5px', // 모서리 둥글게 설정
              border: '1px solid #ccc', // 테두리 설정
              backgroundColor: '#87CEEB', // 배경색 설정
              cursor: 'pointer', // 마우스 커서 모양 변경
            }}
        >
          결제하기
        </button>
        {/* 버튼 */}
      </div>
  );
}
