import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../form.css";
import "../layerpop.css";
import "../progress.css";
import rightArrow from "../images/rightArrow.png";
import Progress from "./components/Progress";
import Button from "./components/Button";
import Footer from "./components/Footer";

function Rental() {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false); // popup status
  const popupRef = useRef();

  const togglePopup = () => {
    setShowPopup(!showPopup); // reverse popup status
  };

  /* when Click Popup Outside to Close. start */
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  /* when Click Popup Outside to Close. end */

  /* when Input Change */
  const onChange = (e) => {
    setStudentId(e.target.value);
  };

  /* Check form value after submit */
  const onSubmit = (e) => {
    e.preventDefault(); // prevent HTML form submit
    if (studentId !== "" && !isNaN(studentId) && studentId.length === 4) {
      togglePopup();
    } else {
      alert("학번을 올바르게 입력해 주세요!");
    }
  };

  /* when Click Popup Button */
  const onClick = () => {
    navigate("/scan", { state: Number(studentId) });
  };

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
            <div className="popup-wrapper">
              <div className="popup-content" ref={popupRef}>
                <h1>유의 사항</h1>
                <h2>우산은 5일 이내로 반납해주세요!</h2>
                <p>학교에 비치된 우산은 모두의 재산입니다.</p>
                <Button btnText="OK!" onClick={onClick} />
              </div>
            </div>
          </>
        )}

        {false && (
          <>
            <div className="overlay" />
            <div className="popup-wrapper" ref={popupRef}>
              <div className="popup-content">
                <h2>학번을 올바르게 입력해 주세요!</h2>
                <Button btnText="OK!" onClick={onClick} />
              </div>
            </div>
          </>
        )}

        <form className="std-form" onSubmit={onSubmit}>
          <label htmlFor="stdId">인적 사항</label>
          <input
            onInput={(e) => {
              let input = e.target;
              if (input.value.length > input.maxLength)
                input.value = input.value.slice(0, input.maxLength);
            }} // Max length
            name="studentId"
            id="stdId"
            type="number"
            maxLength={4}
            onChange={onChange}
            value={studentId}
            placeholder="학번을 입력해 주세요. (e.g. 2515)"
          />
          <Button
            btnText={
              <img
                src={rightArrow}
                alt="Right Arrow Sign"
                className="right-arrow"
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