import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPayment } from '../../api/tosspayment';
import './PaymentData.css';

function PaymentDetailPage() {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        const data = await getPayment(paymentId);
        setPayment(data.data);
      } catch (error) {
        console.error('Error fetching payment detail:', error)
        setError(error);
      }
    };

    fetchPaymentDetail();
  }, [paymentId]);

  if (error) {
    return (
        <div className="payment-detail-container">
          <h1>권한이 없는 결제내역 페이지입니다.</h1>
        </div>
    );
  }

  // 조건에 따라 다른 return문을 사용
  if (!payment) {
    return <p>결제 정보를 불러오는 중...</p>;
  }

  if (payment.statement === 'COMPLETE') {
    return (
        <div className="payment-detail-container">
          <h1>결제 상세 정보</h1>
          <div className="payment-detail">
            <p>결제 금액: {payment.amount} 원</p>
            <p>주문명: {payment.orderName}</p>
            <p>주문 ID: {payment.orderId}</p>
            <p>결제 키: {payment.paymentKey}</p>
            <p>결제 상태: {payment.statement}</p>
          </div>
          <Link to="/payments">
            <button className="button">돌아가기</button>
          </Link>
        </div>
    );
  }

  // 나머지 경우에는 다른 내용을 표시
  return (
      <div className="payment-detail-container">
        <h1>결제 상세 정보</h1>
        <div className="payment-detail">
          <p>결제 금액: {payment.amount} 원</p>
          <p>주문명: {payment.orderName}</p>
          <p>주문 ID: {payment.orderId}</p>
          <p>결제 키: {payment.paymentKey}</p>
          <p>취소 여부: {payment.cancelYN ? '취소됨' : '취소 안 됨'}</p>
          <p>취소 사유: {payment.cancelReason}</p>
          <p>결제 상태: {payment.statement}</p>
        </div>
        <Link to="/payments">
          <button className="button">돌아가기</button>
        </Link>
      </div>
  );
}

export default PaymentDetailPage;
