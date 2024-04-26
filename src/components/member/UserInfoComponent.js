import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {viewUserInfo} from "../../api/memberApi";

const MyPageComponent = ({  }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    viewUserInfo()
    .then((user) => {
      setInfo(user.data);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching Info:", error);
    });
  }, []);

  const handleEditProfile = () => {
    navigate('/member/update');
  };

  return (
      <div className="m-6 flex flex-col justify-center">
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>내정보</div>
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>아이디: {info.username}</div>
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>역할: {info.role}</div>
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>전화번호: {info.phoneNumber}</div>
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>수신동의: {info.consent ? '동의함' : '동의하지 않음'}</div>
        <button className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700" onClick={handleEditProfile}>내 정보 수정</button>
      </div>
  );
};

export default MyPageComponent;