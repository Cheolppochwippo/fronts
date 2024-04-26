import { useEffect, useState } from "react";
import { viewUserInfo } from "../../api/memberApi";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const MyPageComponent = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    viewUserInfo()
      .then((user) => {
        setInfo(user.data);
        setPhoneNumber(user.data.phoneNumber);
        setConsent(user.data.consent);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching Info:", error);
      });
  }, []);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleConsentChange = (e) => setConsent(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${API_SERVER_HOST}/auth/mypage`, {
        phoneNumber,
        consent,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log(response.data);
      setInfo({ ...info, phoneNumber, consent });
      handleModalClose();
    } catch (error) {
      console.error("Error updating user info:", error);
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
      <Button variant="primary" onClick={handleModalOpen}>
        정보 수정
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원 정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>전화번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="전화번호 입력"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </Form.Group>

            <Form.Group controlId="formConsent">
              <Form.Check
                type="checkbox"
                label="수신 동의"
                checked={consent}
                onChange={handleConsentChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyPageComponent;