import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../form.css";
import rightArrow from "../images/rightArrow.png";
import Progress from "./components/Progress";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

function Rental() {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const [showPopupA, setShowPopupA] = useState(false); // popup status
  const [showPopupB, setShowPopupB] = useState(false); // popup status
  const [showPopupC, setShowPopupC] = useState(false); // popup status
  const popupRefA = useRef();
  const popupRefB = useRef();
  const popupRefC = useRef();

  /* when Input Change */
  const onChange = (e) => {
    setStudentId(e.target.value);
  };

  const togglePopupA = () => {
    setShowPopupA((prevState) => !prevState);
  };

  const togglePopupB = () => {
    setShowPopupB((prevState) => !prevState);
  };

  const togglePopupC = () => {
    setShowPopupC((prevState) => !prevState);
  };

  /* when Click Popup Outside to Close. start */
  const handleClickOutside = (e) => {
    if (popupRefA.current && !popupRefA.current.contains(e.target)) {
      setShowPopupA(false);
    }
    if (popupRefB.current && !popupRefB.current.contains(e.target)) {
      setShowPopupB(false);
    }
    if (popupRefC.current && !popupRefC.current.contains(e.target)) {
      setShowPopupC(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  /* Check form value after submit */
  const onSubmit = (e) => {
    e.preventDefault(); // prevent HTML form submit
    if (studentId !== "" && !isNaN(studentId) && studentId.length === 4) {
      setShowPopupA(true);
    } else {
      setShowPopupC(true);
    }
  };

  /* when Click Popup Button */
  const clickOkay = async () => {
    try {
      const response = await fetch("https://api.neoflux.club/send", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          willChk: true,
          stdId: Number(studentId),
        }),
      });

      const chk = await response.json();

      if (chk.isAvailable) {
        navigate("/scan", { state: Number(studentId) });
      } else if (chk.isAvailable === false) {
        setShowPopupA(false);
        setShowPopupB(true);
      } else {
        console.log("Error while Check (from Client)");
      }
    } catch (err) {
      console.log(err);
    }
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

        {/* Popup A */}
        {showPopupA && (
          <Popup
            popupRef={popupRefA}
            onClose={togglePopupA}
            onButtonClick={clickOkay}
            title="유의 사항"
            subTitle="우산은 5일 이내로 반납해주세요!"
            buttonText="OK!"
            hasCloseBtn
          />
        )}
        {/* Popup B */}
        {showPopupB && (
          <Popup
            popupRef={popupRefB}
            onClose={togglePopupB}
            onButtonClick={togglePopupB}
            title={[
              "실패 ",
              <FontAwesomeIcon key="icon" icon={faExclamation} />,
            ]}
            subTitle={[
              "이미 대여중인 사용자 입니다.",
              <br key="line-break" />,
              "반납 후 대여해 주세요.",
            ]}
            smallText="(본인이 대여하지 않은 경우, 아래의 채팅앱을 통해 제보해 주세요!)"
            buttonText="넵 🫤"
            showChat
          />
        )}
        {/* Popup C */}
        {showPopupC && (
          <Popup
            popupRef={popupRefC}
            onClose={togglePopupC}
            onButtonClick={togglePopupC}
            title={[
              "실패 ",
              <FontAwesomeIcon key="icon" icon={faExclamation} />,
            ]}
            subTitle={"학번을 올바르게 입력해 주세요!"}
            buttonText="넵 🫤"
          />
        )}

        <form className="std-form" onSubmit={onSubmit}>
          <label htmlFor="stdId">인적 사항</label>
          <input
            onInput={(e) => {
              let input = e.target;
              if (input.value.length > input.maxLength)
                input.value = input.value.slice(0, input.maxLength);
            }}
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
