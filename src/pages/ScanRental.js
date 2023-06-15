import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Scanner from "./components/ScanDB";
import Progress from "./components/Progress";
import Popup from "./components/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

function ScanRental() {
  const { state: stdId } = useLocation();

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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

  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>

        <Progress progress={1} />

        {showPopup && (
          <Popup
            popupRef={popupRef}
            onClose={togglePopup}
            onButtonClick={togglePopup}
            title={[
              "실패 ",
              <FontAwesomeIcon key="icon" icon={faExclamation} />,
            ]}
            subTitle={[
              "이 우산은 이미 대여되었습니다.",
              <br key="line-break" />,
              "반납 후 다시 대여해 주세요.",
            ]}
            buttonText="넵 🫤"
          />
        )}

        <p className="progress-status">우산 대여</p>
        <div className="scanner">
          <Scanner state={0} stdId={stdId} setShowPopup={setShowPopup} />
        </div>
        {/* 0(false) -> rental
        1(true) -> return */}
      </div>
      <Footer />
    </>
  );
}

export default ScanRental;
