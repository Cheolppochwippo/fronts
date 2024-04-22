import React, { useEffect, useState } from 'react';
import { getPayments } from '../../api/tosspayment'; // getPayments 함수 가져오기
import { useNavigate } from "react-router-dom";
import "./PaymentList.css"

function PaymentListPageComponent() {
  const [payments, setPayments] = useState([]); // 결제 목록을 저장할 상태
  const [selectedPayment, setSelectedPayment] = useState(null); // 선택된 결제 정보 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 초기 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const data = await getPayments(currentPage);
        setPayments(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchData(); // 함수 호출
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  // 결제 정보를 클릭했을 때 해당 결제 정보를 선택하는 함수
  const handlePaymentClick = (payment) => {
    try {
      navigate({ pathname: `/payments/${payment.id}` }, { replace: true });
    } catch (error) {
      console.error("Error while adding order:", error);
    }
  };

  // 페이지 버튼들을 렌더링하는 함수
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 10;
    const start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const end = Math.min(totalPages, start + maxButtons - 1);

    for (let i = start; i <= end; i++) {
      buttons.push(
          <button
              key={i}
              className={i === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
      );
    }

    return buttons;
  };

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
      <div>
        <h1>결제 목록</h1>
        <div className="payment-container">
          {/* 결제 목록이 비어 있는지 확인하여 조건부 렌더링 */}
          {payments && payments.length > 0 && payments.map((payment) => (
              <div key={payment.id} className="payment-card">
                {/* 각 결제 정보를 카드 형식으로 렌더링 */}
                <div className="payment-content">
                  <p>주문명: {payment.orderName}</p>
                  <p>주문 상태: {payment.statement}</p>
                  <p>결제 금액: {payment.amount} 원</p>
                </div>
                <button className="payment-button" onClick={() => handlePaymentClick(payment)}>
                  상세 정보 보기
                </button>
              </div>
          ))}
        </div>

        {/* 페이지 버튼들 */}
        <div className="pagination">
          {/* 이전 페이지 버튼 */}
          <button onClick={goToPrevPage}>&laquo;</button>

          {/* 페이지 버튼들 */}
          {renderPageButtons()}

          {/* 다음 페이지 버튼 */}
          <button onClick={goToNextPage}>&raquo;</button>
        </div>

      </div>
  );
}

export default PaymentListPageComponent;
