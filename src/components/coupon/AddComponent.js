import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createCoupon} from "../../api/couponApi";

const AddComponent = () => {
  const [requestParam, setRequestParam] = useState(
      {couponInfo: "", discount: 0, effectiveDate: null, amount: 0});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;
    if(e.target.name==="discount"){
      e.target.value = parseFloat(value);
    }
    setRequestParam((prev) => ({...prev, [name]: value}));
  };

  const addCoupon = async () => {
    try {
      const addedCoupon = await createCoupon(requestParam);
      window.alert('쿠폰이 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error("Error while adding coupon:", error);
    }
  };

  return (
      <div className="coupon-container">
        <div className="couponInfo-container">
          <label htmlFor="couponInfo" className="couponInfo-label">
            쿠폰 정보
          </label>
          <input
              className="couponInfo-input"
              name="couponInfo"
              type="text"
              value={requestParam.couponInfo}
              onChange={handleChange}
          />
        </div>
        <div className="discount-container">
          <label htmlFor="discount" className="discount-label">
            할인율
          </label>
          <input
              className="discount-input"
              name="discount"
              type="text"
              value={requestParam.discount}
              onChange={handleChange}
          />
        </div>
        <div className="effectiveDate-container">
          <label htmlFor="effectiveDate" className="effectiveDate-label">
            유효기간
          </label>
          <input
              className="effectiveDate-input"
              name="effectiveDate"
              type="datetime-local"
              value={requestParam.effectiveDate}
              onChange={handleChange}
          />
        </div>
        <div className="amount-container">
          <label htmlFor="amount" className="amount-label">
            발급수량
          </label>
          <input
              className="amount-input"
              name="amount"
              type="number"
              value={requestParam.amount}
              onChange={handleChange}
          />
        </div>
        <div className="coupon-button-container  ">
          <button className="coupon-button" onClick={addCoupon}>
            만들기
          </button>
        </div>
      </div>
  );
};

export default AddComponent;


