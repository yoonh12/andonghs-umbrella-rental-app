import "../form.css";
import "../layerpop.css";
import "../progress.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Progress from "./components/Progress";
import Button from "./components/Button";
import rightArrow from "../images/rightArrow.png";

function Rental() {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  const togglePopup = () => {
    setShowPopup(!showPopup);
    console.log(showPopup);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      console.log(popupRef.current);
      setShowPopup(false);
    }
  };

  const onChange = (e) => {
    setStudentId(e.target.value);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    togglePopup();
  };
  
  const onClick = () => {
    navigate("/scan", { state: { studentId } });
  }

  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>

        <Progress progress={0} />

          {showPopup && (
            <>
              <div className="overlay" />
              <div className="popup-wrapper" ref={popupRef}>
                <div className="popup-content">
                  <h1>유의 사항</h1>
                  <h2>우산은 5일 이내로 반납해주세요!</h2>
                  <p>학교에 비치된 우산은 모두의 재산입니다.</p>
                  {/* <button onClick={togglePopup}>닫기</button> */}
                  <Button btnText="OK!" onClick={onClick} />
                </div>
              </div>
            </>
          )}

        <form className="std-form" onSubmit={onSubmit}>
          <label htmlFor="stdId">인적 사항</label>
          <input
            name="studentId"
            id="stdId"
            type="number"
            onChange={onChange}
            value={studentId}
            placeholder="학번을 입력해 주세요. (e.g. 2515)"
          />
          <Button
            btnText={
              <img
                src={rightArrow}
                alt="Right Arrow Sign"
                style={{ width: "25px" }}
              />
            }
            btnType="submit"
          />
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Rental;
