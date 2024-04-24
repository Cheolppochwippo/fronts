import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTotalOrder } from '../../api/totalOrderApi';
import axios from 'axios';
import PaymentCancelPopup from './PaymentCancelPopup'; // PaymentCancelPopup 컴포넌트 import
import "./TotalOrderData.css"

function TotalOrderDetailPage() {
  const { totalOrderId } = useParams();
  const [totalOrder, setTotalOrder] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // 팝업을 열고 닫는 상태 추가
  const [cancelReason, setCancelReason] = useState(''); // 취소 사유를 관리하는 상태 추가

  useEffect(() => {
    const fetchTotalOrderDetail = async () => {
      try {
        const res = await getTotalOrder(totalOrderId);
        setTotalOrder(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching total order detail:', error);
        setError(error);
      }
    };

    fetchTotalOrderDetail();
  }, [totalOrderId]);

  const handlePopupOpen = () => {
    setShowPopup(true); // 팝업을 열 때 상태 변경
  };

  const handlePopupClose = () => {
    setShowPopup(false); // 팝업을 닫을 때 상태 변경
    setCancelReason(''); // 팝업을 닫을 때 취소 사유 초기화
  };

  if (error) {
    return (
        <div className="total-order-detail-container">
          <h1>주문 상세 정보</h1>
          <p>권한이 없는 주문 페이지입니다.</p>
        </div>
    );
  }

  if (!totalOrder) {
    return <p>주문 정보를 불러오는 중...</p>;
  }

  return (
      <div className="total-order-detail-container">
        <h1>주문 상세 정보</h1>
        <div className="total-order-detail">
          <p>주문명: {totalOrder.orderName}</p>
          {/* 주문 상태에 따라 다른 내용 표시 */}
          {totalOrder.paymentStatementEnum === 'REFUND' ? (
              <div>
                <p>결제 상태: 환불완료</p>
                <p>환불 시간: {new Date(totalOrder.modifiedAt).toLocaleString()}</p>
              </div>
          ) : (
              <div>
                <p>결제 상태: 결제 성공</p>
                <p>결제 시간: {new Date(totalOrder.modifiedAt).toLocaleString()}</p>
              </div>
          )}
          <p>가격: {totalOrder.realPrice} 원</p>
          <p>할인 금액: -{totalOrder.discount} 원</p>
          <p>배송 비용: {totalOrder.deliveryCost} 원</p>
          <p>결제 총액: {totalOrder.priceAmount} 원</p>
          <p>주소: {totalOrder.address}</p>
        </div>
        {/* 팝업 창을 여는 버튼 추가 */}
        {totalOrder.paymentStatementEnum !== 'REFUND' && (
            <button className="button" onClick={handlePopupOpen}>
              결제 취소
            </button>
        )}
        {/* 팝업 창 */}
        {showPopup && (
            <PaymentCancelPopup paymentKey={totalOrder.paymentKey}
                                onClose={handlePopupClose}/>
        )}
        <Link to="/member/mypage">
          <button className="button">돌아가기</button>
        </Link>
      </div>
  );
}

export default TotalOrderDetailPage;
