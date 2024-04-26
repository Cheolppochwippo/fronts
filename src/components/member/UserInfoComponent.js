import {useEffect, useState} from "react";
import {viewUserInfo} from "../../api/memberApi";

const MyPageComponent = ({  }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

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
      </div>
  );
};

export default MyPageComponent;

