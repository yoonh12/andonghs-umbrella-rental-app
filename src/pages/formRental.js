import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import rightArrow from "../images/rightArrow.png";
import loadIcon from "../images/loading.svg";
import Progress from "../components/progress";
import Button from "../components/button";
import Footer from "../components/footer";
import Popup from "../components/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

function Rental() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [showWarn, setShowWarn] = useState(false); // display error if student id isn't correct

  const [loading, setLoading] = useState(false);

  const [showCautionPop, setShowCautionPop] = useState(false); // popup status
  const popCaution = useRef();

  const [showExistUserPop, setShowExistUserPop] = useState(false); // popup status
  const popExistUser = useRef();

  const [showLateUserPop, setShowLateUserPop] = useState(false); // popup status
  const popLateUser = useRef();

  /* when Input Change */
  const onChange = (e) => {
    setStudentId(e.target.value);
  };

  const toggleCautionPopup = () => {
    setShowCautionPop((prev) => !prev);
  };

  const toggleExistUserPop = () => {
    setShowExistUserPop((prev) => !prev);
  };

  const toggleLateUserPop = () => {
    setShowLateUserPop((prev) => !prev);
  };

  /* when Click Popup Outside to Close. start */
  const handleClickOutside = (e) => {
    if (popCaution.current && !popCaution.current.contains(e.target)) {
      setShowCautionPop(false);
    }
    if (popExistUser.current && !popExistUser.current.contains(e.target)) {
      setShowExistUserPop(false);
    }
    if (popLateUser.current && !popLateUser.current.contains(e.target)) {
      setShowLateUserPop(false);
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
    if (
      studentId !== "" &&
      !isNaN(studentId) &&
      studentId.length === 4 &&
      Number(studentId) < 3800
    ) {
      setShowCautionPop(true);
    } else {
      setShowWarn(true);
    }
  };

  /* when Click Popup Button */
  const clickOkay = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          willChk: true,
          stdId: Number(studentId),
        }),
      });

      setLoading(false);

      const chk = await response.json();

      if (chk.isAvailable && chk.noDelayed === undefined) {
        navigate("/scan", { state: { stdId: Number(studentId) } });
      } else if (chk.notDelayed === false) {
        setShowCautionPop(false);
        setShowLateUserPop(true);
      } else if (chk.isAvailable === false) {
        setShowCautionPop(false);
        setShowExistUserPop(true);
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

        {loading && <div className="loading"><img src={loadIcon} alt="loading" /></div>}

        {showCautionPop && (
          <Popup
            popupRef={popCaution}
            onClose={toggleCautionPopup}
            onButtonClick={clickOkay}
            title="유의 사항"
            subTitle="우산은 5일 이내로 반납해주세요!"
            buttonText="OK!"
            hasCloseBtn
          />
        )}

        {showExistUserPop && (
          <Popup
            popupRef={popExistUser}
            onButtonClick={toggleExistUserPop}
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

        {showLateUserPop && (
          <Popup
            popupRef={popLateUser}
            onButtonClick={toggleLateUserPop}
            title={[
              "실패 ",
              <FontAwesomeIcon key="icon" icon={faExclamation} />,
            ]}
            subTitle="연체되었습니다."
            smallText="관리자가 확인할 때 까지 기다려 주세요."
            buttonText="알겠습니다"
          />
        )}

        {/* Form */}
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
          {showWarn && (
            <div className="input-warn">학번을 올바르게 입력해 주세요!</div>
          )}
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
