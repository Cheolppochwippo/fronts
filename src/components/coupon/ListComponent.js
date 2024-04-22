import { useEffect, useState } from 'react';
import { getCoupons } from '../../api/couponApi';
import './CouponList.css';
import { issuedCoupon } from '../../api/issuedApi';

const ListComponent = () => {
  const [coupons, setCoupons] = useState([]); // 쿠폰 목록을 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    getCoupons()
    .then(coupons => {
      setCoupons(coupons || []); // API 응답이 없으면 빈 배열로 초기화
      setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
    })
    .catch(error => {
      console.error('Error fetching coupons:', error);
      setLoading(false); // 데이터 로딩 실패 시 로딩 상태 변경
    });
  }, []);

  const handleIssueCoupon = async (couponId) => {
    try {
        await issuedCoupon(couponId);
        alert('쿠폰이 성공적으로 발급되었습니다.');
    } catch (error) {
      if (error.response.data.msg === '이미 쿠폰을 발급 받으셨습니다.') {
        alert('이미 발급된 쿠폰입니다.');
      }else{
      console.error('Error issuing coupon:', error);
      alert('쿠폰 발급 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }
  return (
    <div className="coupon-list">

      { coupons.data.map((coupon, index) => (
        <div key={index} className="coupon-item">
          <div className="coupon-header">
            <span>{coupon.couponInfo}</span>
          </div>
          <div className="coupon-content">
            <span className="discount">{coupon.discount}%</span>
            {/* <span className="action">적용하기</span> */}
            <span className="action" onClick={() => handleIssueCoupon(coupon.couponId)}>쿠폰받기</span>
          </div>
          <div className="coupon-period">사용 기한: {coupon.effectiveDate.substring(0, 10)}</div>
          <div className="coupon-period">남은 쿠폰 개수: {coupon.amount}개</div>
        </div>
      ))}
    </div>
  );
};
  // return (
  //     <div>
  //       <h1>Coupons</h1>
  //       <ul>
  //         {coupons.data.map((coupon, index) => (
  //             <li key={index}>
  //               <p>Coupon Info: {coupon.couponInfo || "No Information"}</p>
  //               <p>Discount: {coupon.discount}</p>
  //               <p>Amount: {coupon.amount}</p>
  //             </li>
  //         ))}
  //       </ul>
  //     </div>
  // );
// };

export default ListComponent;
