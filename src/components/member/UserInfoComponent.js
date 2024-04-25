import {useEffect, useState} from "react";
import {viewUserInfo} from "../../api/memberApi";

const MyPageComponent = ({  }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    viewUserInfo()
    .then((user) => {
      setInfo(user);
      console.log(user)
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching Info:", error);
    });
  }, []);

  return (
      <div className="m-6 flex justify-center">
        <div>username: {info.username}</div>
        <div>role: {info.role}</div>
        <div>phoneNumber: {info.phoneNumber}</div>
        <div>수신동의: {info.consent}</div>
      </div>
  );
};

export default MyPageComponent;

