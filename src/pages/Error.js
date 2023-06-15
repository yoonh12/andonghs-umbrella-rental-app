import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../process.css";
import Button from "./components/Button";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function HandleError() {
  const { state } = useLocation();

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
        {/* <img src={checkLogo} alt="Check Sign" style={{ margin: "5px 0 0" }} /> */}
        <div className="icon"><FontAwesomeIcon icon={faTriangleExclamation} /></div>
        <h2 className="process error">오류</h2>
        <p className="info">죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.<br/>문제가 지속될 경우 아래의 채팅앱을 통해<br/>오류 메시지와 함께 제보해주세요.</p>
        <h3 className="warning">{state}</h3>
        <Link to="/">
          <Button btnText="돌아가기" />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default HandleError;
