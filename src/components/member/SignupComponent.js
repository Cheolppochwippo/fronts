import React, { useState } from 'react';
import { signupPost } from '../../api/memberApi';
import { useNavigate } from 'react-router-dom';

const SignupComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [consent, setConsent] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupPost({ username, password, phoneNumber, consent });
      console.log(response);
      alert("회원가입 성공")
      navigate('/member/login');
      
      // 회원가입 성공 시 추가 동작 구현
    } catch (error) {
      console.error('Error:', error);
      // 회원가입 실패 시 에러 처리 구현
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            아이디*
          </label>
          <input
            id="username"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            비밀번호*
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passwordConfirm" className="block font-bold mb-2">
            비밀번호 확인*
          </label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            이름*
          </label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력해 주세요"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div> */}
        {/* <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            이메일*
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일: marketkurly@kurly.com"
            value="marketkurly@kurly.com"
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
          />
        </div> */}
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
        {/* <div className="mb-4">
          <label htmlFor="address" className="block font-bold mb-2">
            주소*
          </label>
          <input
            id="address"
            type="text"
            placeholder="주소 검색"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div> */}
        {/* <div className="mb-4">
          <label className="block font-bold mb-2">성별</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              className="mr-2"
            />
            <label htmlFor="male" className="mr-4">
              남자
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              className="mr-2"
            />
            <label htmlFor="female" className="mr-4">
              여자
            </label>
            <input
              type="radio"
              id="none"
              name="gender"
              value="none"
              defaultChecked
              className="mr-2"
            />
            <label htmlFor="none">선택안함</label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="birthDate" className="block font-bold mb-2">
            생년월일
          </label>
          <input
            id="birthDate"
            type="text"
            placeholder="YYYY / MM / DD"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div> */}
        <div className="mb-4">
          <label className="block font-bold mb-2">이용약관 동의</label>
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
                개인정보 수집, 이용을 동의하시면 서비스를 이용할 수 있습니다.
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default SignupComponent;
