import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserRole, viewUserInfo } from "../../api/memberApi";


const MyPageComponent = () => {
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
    navigate("/member/update");
  };

  const handleUpdateRole = async () => {
    try {
      const response = await updateUserRole();
      // 성공적으로 역할이 변경되었을 때 추가 로직 구현
      alert("role이 update 되었습니다!");
      console.log("Role update success:", response);
      // 필요한 경우 페이지 새로고침 또는 다른 작업 수행
      window.location.reload();
    } catch (error) {
      alert("실패");
      console.error("Error updating role:", error);
      // 역할 변경 실패 시 처리 로직 구현
    }
  };


  return (
    <div className="m-6 flex flex-col justify-center">
      <div style={{ marginBottom: "1em", fontWeight: "bold" }}>내정보</div>
      <div style={{ marginBottom: "1em", fontWeight: "bold" }}>
        아이디: {info.username}
      </div>
      <div style={{ marginBottom: "1em", fontWeight: "bold" }}>
        역할: {info.role}
      </div>
      <div style={{ marginBottom: "1em", fontWeight: "bold" }}>
        전화번호: {info.phoneNumber}
      </div>
      <div style={{ marginBottom: "1em", fontWeight: "bold" }}>
        수신동의: {info.consent ? "동의함" : "동의하지 않음"}
      </div>
      <button
        className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
        onClick={handleEditProfile}
      >
        내 정보 수정
      </button>
      <button
        className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 mt-2"
        onClick={handleUpdateRole}
      >
        role 변경 하기
      </button>
    </div>
  );
};

export default MyPageComponent;
