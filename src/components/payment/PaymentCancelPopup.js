import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelPayment } from '../../api/tosspayment';

function PaymentCancelPopup({ paymentKey, onClose }) {
  const [cancelReason, setCancelReason] = useState('');
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      // 취소 사유와 결제 키를 바탕으로 결제를 취소합니다.
      await cancelPayment({ paymentKey, cancelReason });
      alert('취소가 완료되었습니다.');
      onClose(); // 팝업을 닫습니다.
      navigate('/member/mypage');
    } catch (error) {
      console.error('Error canceling payment:', error);
    }
  };

  return (
      <div className="popup">
        <button className="close-button" onClick={onClose}>X</button>
        <p>취소 사유를 입력하세요:</p>
        <div className="cancel-reason-input">
      <textarea
          className="cancel-reason-textarea"
          placeholder="여기에 취소 사유를 작성해주세요"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          rows={4}
      />
        </div>
        <button onClick={handleCancel}>결제 취소</button>
      </div>
  );

}

export default PaymentCancelPopup;
