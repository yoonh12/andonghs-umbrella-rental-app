import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../process.css";
import Popup from "./components/Popup";
import Button from "./components/Button";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function HandleError() {
  const { state } = useLocation();
  const errMsg = JSON.stringify(state);

  const doErrCopy = () => {
    try {
      navigator.clipboard.writeText(errMsg);
    } catch {
      setShowCopyFailPop(true);
    }
  };

  const [showCopyFailPop, setShowCopyFailPop] = useState(false);
  const popCopyFail = useRef();
  const errMsgRef = useRef();

  const closeCopyFailPop = () => {
    setShowCopyFailPop(false);
  };

  const handleClickOutside = (e) => {
    if (
      popCopyFail.current &&
      !popCopyFail.current.contains(e.target) &&
      !errMsgRef.current.contains(e.target)
    ) {
      setShowCopyFailPop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  console.log(showCopyFailPop);

  useEffect(() => {
    if (state === null) {
      window.history.back();
    }
  }, [state]);

  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>

        {showCopyFailPop && (
          <Popup
            popupRef={popCopyFail}
            onButtonClick={closeCopyFailPop}
            title={[
              "실패 ",
              <FontAwesomeIcon key="icon" icon={faExclamation} />,
            ]}
            subTitle={"복사에 실패했어요..."}
            smallText="텍스트를 꾹 눌러서 수동으로 라두.."
            buttonText=":("
            showChat
          />
        )}

        <div className="icon">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </div>
        <h2 className="process error">오류</h2>
        <p className="info">
          죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.
          <br />
          문제가 지속될 경우 아래의 채팅앱을 통해
          <br />
          오류 메시지와 함께 제보해주세요.
          <br />
          (메시지를 누르면 복사됩니다.)
        </p>
        <button
          ref={errMsgRef}
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={doErrCopy}
        >
          <h3 className="warning">{errMsg}</h3>
        </button>
        <Link to="/">
          <Button btnText="돌아가기" />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default HandleError;
