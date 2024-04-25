import React, { useEffect, useState } from 'react';
import { getIssued } from '../../api/issuedApi';
import 'CouponList.css'

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
      <div className="coupon-grid">
        {coupons.map((coupon, index) => (
            <div key={index} className="card coupon-item">
              <div className="card-body">
                <h5 className="card-title coupon-header">{coupon.couponInfo}</h5>
                <p className="card-text discount">{coupon.discount * 100}% 할인</p>
                <p className="card-text coupon-period">사용 기한: {coupon.effectiveDate ? coupon.effectiveDate.substring(0, 10) : ''}</p>
              </div>
            </div>
        ))}
      </div>
  );

}
export default MyCouponListComponent;
