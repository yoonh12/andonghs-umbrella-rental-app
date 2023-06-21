import { useRef, useState, useEffect } from "react";
import Footer from "./components/Footer";
import Scanner from "./components/ScanDB";
import Progress from "./components/Progress";
import Popup from "./components/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faQrcode } from "@fortawesome/free-solid-svg-icons";

function ScanRental() {
  const [popRes, setPopRes] = useState(false);

  const [showAvailPop, setShowAvailPop] = useState(false);
  const popAvail = useRef();

  const [showAskPop, setShowAskPop] = useState(false);
  const popAsk = useRef();

  const [umbId, setUmbId] = useState(0);

  const closeAvailPop = () => {
    setShowAvailPop(false);
  };

  const closeAskPop = () => {
    setShowAskPop(false);
  };

  const handleClickOutside = (e) => {
    if (popAvail.current && !popAvail.current.contains(e.target)) {
      setShowAvailPop(false);
    }
    if (popAsk.current && !popAsk.current.contains(e.target)) {
      setShowAskPop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onClickYes = () => {
    setPopRes(true);
  };

  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>

        <Progress progress={1} />

        {showAskPop && (
          <Popup
            popupRef={popAsk}
            onButtonClickYes={onClickYes}
            onButtonClickNo={closeAskPop}
            title={["확인 ", <FontAwesomeIcon key="icon" icon={faQrcode} />]}
            subTitle={umbId + "번 우산이 맞나요?"}
            buttonTextYes="네!"
            buttonTextCancel="아니요.."
          />
        )}

        {showAvailPop && (
          <Popup
            popupRef={popAvail}
            onButtonClick={closeAvailPop}
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
          <Scanner
            isRenting={true}
            popRes={popRes}
            setPopRes={setPopRes}
            umbId={umbId}
            setUmbId={setUmbId}
            setShowAskPop={setShowAskPop}
            setShowAvailPop={setShowAvailPop}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ScanRental;
