import React, { useEffect, useState } from 'react';
import { getIssued } from '../../api/issuedApi';

const MyCouponListComponent = () => {
  const [coupons, setCoupons] = useState([]); // 쿠폰 목록을 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    console.log(coupons)
    getIssued()
    .then(data => {
      setCoupons(data.data || []); // API 응답이 없으면 빈 배열로 초기화
      setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
    })
    .catch(error => {
      console.error('Error fetching coupons:', error);
      setLoading(false); // 데이터 로딩 실패 시 로딩 상태 변경
    });
  }, []);


  return (
    <div className="coupon-list">

      { coupons.map((coupon, index) => (
        <div key={index} className="coupon-item">
          <div className="coupon-header">
            <span>{coupon.couponInfo}</span>
          </div>
          <div className="coupon-content">
            <span className="discount">{coupon.discount*100}%</span>
          </div>
          <div className="coupon-period">사용 기한: {coupon.effectiveDate ? coupon.effectiveDate.substring(0, 10) : ''}</div>
        </div>
      ))}
    </div>
  );
};

export default MyCouponListComponent;
