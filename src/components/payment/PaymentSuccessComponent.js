import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmPayment } from "../../api/tosspayment";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css"; // CSS 파일을 import 합니다.

const initState = {
  orderId: '',
  paymentKey: '',
  amount: 0
};

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [requestParam, setRequestParam] = useState({ ...initState });
  const [paymentResult, setPaymentResult] = useState(null); // 결제 결과 상태
  const [msg, setMsg] = useState("알 수 없는 오류 발생");

  const returnToHomePage = () => {
    navigate("/");
  };

  const checkPayment = async () => {
    try {
      const newRequestParam = { ...requestParam };
      newRequestParam['orderId'] = searchParams.get("orderId");
      newRequestParam['paymentKey'] = searchParams.get("paymentKey");
      newRequestParam['amount'] = searchParams.get("amount");

      // 서버로 결제 승인 요청
      const result = await confirmPayment(newRequestParam);
      setPaymentResult(result.data); // 결제 결과 설정
      console.log(paymentResult)
    } catch (error) {
      console.error("Error while confirming payment:", error);
      setMsg(error.response?.data?.msg || "알 수 없는 오류 발생");
    } finally {
      setLoading(false); // 데이터 로딩 상태 갱신
    }
  };

  useEffect(() => {
    checkPayment(); // 페이지가 로드될 때 결제 승인 확인
  }, []); // 빈 배열을 전달하여 처음 한 번만 실행되도록 설정

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 표시할 내용
  }

  // 결제 성공 시 메시지 표시
  if (paymentResult?.data.orderId) {
    return (
        <div className="payment-success-page">
          <h1 className="success-message">결제 성공</h1>
          <div className="result-info">
            <div className="result-box">
              <div className="result-title">주문명</div>
              <div
                  className="textbox">{paymentResult?.jsonObject.orderName}</div>
            </div>
            <div className="result-box">
              <div className="result-title">주문 번호</div>
              <div
                  className="textbox">{paymentResult?.jsonObject.orderId}</div>
            </div>
            <div className="result-box">
              <div className="result-title">결제 금액:</div>
              <div
                  className="textbox">{paymentResult?.jsonObject.totalAmount}원
              </div>
            </div>
            <div className="result-box">
              <div className="result-title">배송 주소:</div>
              <div
                  className="textbox">{paymentResult?.address}
              </div>
            </div>
          </div>
          <button className="return-button" onClick={returnToHomePage}>돌아가기
          </button>
        </div>
    );
  }

  // 결제 실패 시 메시지 표시
  return (
      <div className="payment-fail-page">
        <h1 className="fail-message">결제 실패</h1>
        <div className="textbox fail-message">{`사유: ${msg}`}</div>
        <button className="return-button" onClick={returnToHomePage}>돌아가기</button>
      </div>
  );
}

export default SuccessPage;
