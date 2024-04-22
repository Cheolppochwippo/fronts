import React, { useEffect, useState } from 'react';
import { getTotalOrders } from '../../api/totalOrderApi';
import { useNavigate } from "react-router-dom";
import "./TotalOrderList.css";

function TotalOrderListComponent() {
  const [totalOrders, setTotalOrders] = useState([]); // 주문 목록을 저장할 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 초기 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const data = await getTotalOrders(currentPage);
        setTotalOrders(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    fetchData(); // 함수 호출
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  // 주문 정보를 클릭했을 때 해당 주문 정보를 선택하는 함수
  const handleOrderClick = (order) => {
    try {
      navigate({ pathname: `/totalOrders/${order.id}` }, { replace: true });
    } catch (error) {
      console.error("페이지 이동 에러:", error);
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
      <div className="total-orders-container">
        <h1 className="total-orders-heading">주문 목록</h1>
        <div className="order-container">
          {/* 주문 목록이 비어 있는지 확인하여 조건부 렌더링 */}
          {totalOrders && totalOrders.length > 0 ? (
              totalOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    {/* 각 주문 정보를 카드 형식으로 렌더링 */}
                    <div className="order-card-content">
                      <p className="order-name">주문명: {order.orderName}</p>
                      <p className="payment-status">결제 상태: {order.paymentStatementEnum}</p>
                      <p className="payment-amount">결제 금액: {order.priceAmount} 원</p>
                    </div>
                    <button className="order-button" onClick={() => handleOrderClick(order)}>
                      상세 정보 보기
                    </button>
                  </div>
              ))
          ) : (
              <p className="no-orders-message">주문이 없습니다.</p>
          )}
        </div>

        {/* 페이지 버튼들 */}
        <div className="pagination">
          {/* 이전 페이지 버튼 */}
          <button className="page-button" onClick={goToPrevPage}>&laquo; 이전</button>

          {/* 페이지 버튼들 */}
          {renderPageButtons()}

          {/* 다음 페이지 버튼 */}
          <button className="page-button" onClick={goToNextPage}>다음 &raquo;</button>
        </div>
      </div>
  );
}

export default TotalOrderListComponent;
