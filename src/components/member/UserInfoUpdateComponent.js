import React, { useState } from 'react';
import { updateUserInfo } from '../../api/memberApi';
import {useNavigate} from "react-router-dom";

const UserInfoUpdateComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [consent, setConsent] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleConsentChange = (e) => {
    setConsent(e.target.checked);
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      const updatedInfo = {
        phoneNumber,
        consent,
      };

      await updateUserInfo(updatedInfo);
      setUpdateSuccess(true);
      alert("수정이 완료되었습니다.");
      navigate('/member/mypage', { replace: true }); // /member/mypage로 이동하고 현재 URL 기록을 대체


    } catch (error) {
      setUpdateError('회원 정보 업데이트에 실패했습니다.');
      console.error('Error updating user info:', error);
    } 
  };

return (
    <div className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-bold mb-2">
            휴대폰*
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="휴대폰 번호를 입력해주세요."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">이벤트성 문자 발송 수신 동의</label>
          <div>
            <input
              type="checkbox"
              id="eventSubscription"
              name="eventSubscription"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="eventSubscription" className="mr-4">
              동의합니다.
            </label>
            <p className="text-gray-600">
              저희는 귀하에게 이벤트, 프로모션 소식, 할인 혜택 등의 정보를 제공하기 위해 문자 메시지를 발송하고자 합니다. 귀하의 개인 정보를 보호하며, 귀하가 제공하는 정보는 오직 이벤트 및 프로모션 소식 발송에만 사용됩니다.
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default UserInfoUpdateComponent;