import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/process.css";
import Button from "./components/Button";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function Delay() {
  const { state } = useLocation();
  const outOfDate = state?.outOfDate;

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

        <div className="icon">
          <FontAwesomeIcon icon={faClock} />
        </div>
        <h2 className="process error">연체되었습니다</h2>
        <p className="info">
          우산을 5일 이내에 반납하지 않아 연체 처리되었습니다.
          <br />이 경우, 관리자가 확인하기 전까지{" "}
          <span style={{ fontWeight: 900 }}>우산을 대여하실 수 없습니다.</span>
        </p>
        <h3 className="warning">{`${outOfDate}일 연체`}</h3>
        <Link to="/">
          <Button btnText="돌아가기" />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Delay;
