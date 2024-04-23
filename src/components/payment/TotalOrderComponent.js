import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { totalOrderAdd } from "../../api/totalOrderApi";
import { getIssued } from "../../api/issuedApi";
import "./TotalOrderComponent.css"; // CSS 파일 import

const TotalOrderComponent = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestParam, setRequestParam] = useState({ issuedId: 0, address: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestParam((prev) => ({ ...prev, [name]: value }));
  };

  const addOrder = async () => {
    try {
      const addedOrder = await totalOrderAdd(requestParam);
      localStorage.setItem("addOrder", JSON.stringify(addedOrder));
      navigate({ pathname: "/payment" }, { replace: true });
    } catch (error) {
      console.error("Error while adding order:", error);
    }
  };

  useEffect(() => {
    getIssued()
    .then((coupons) => {
      setCoupons(coupons || []);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching coupons:", error);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="total-order-container">
        <div className="coupon-container">
          <label htmlFor="issuedId" className="coupon-label">
            사용 가능한 쿠폰
          </label>
          <select name="issuedId" id="issuedId" onChange={handleChange} className="coupon-select">
            <option value="0">선택 안함</option>
            {coupons.data.map((coupon, index) => (
                <option key={index} value={coupon.issuedId}>
                  {coupon.couponInfo || "No Information"}
                </option>
            ))}
          </select>
        </div>
        <div className="address-container">
          <label htmlFor="address" className="address-label">
            배송 정보
          </label>
          <input
              className="address-input"
              name="address"
              type="text"
              value={requestParam.address}
              onChange={handleChange}
          />
        </div>
        <div className="payment-button-container  ">
          <button className="payment-button" onClick={addOrder}>
            결제하기
          </button>
        </div>
      </div>
  );
};

export default TotalOrderComponent;
