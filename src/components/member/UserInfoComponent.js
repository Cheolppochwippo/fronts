import {useEffect, useState} from "react";
import {viewUserInfo} from "../../api/memberApi";

const MyPageComponent = ({  }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    viewUserInfo()
    .then((user) => {
      setInfo(user);
      console.log(user,"AAAAAAAAAAAAAAAAAAAAAA")
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching Info:", error);
    });
  }, []);

  return (
      <div className="m-6 flex justify-center">
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>username: {info.username}</div>
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>role: {info.role}</div>
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>phoneNumber: {info.phoneNumber}</div>
        <div style={{
          marginBottom: '1em',
          fontWeight: 'bold'
        }}>수신동의: {info.consent}</div>
      </div>
  );
};

export default MyPageComponent;

