import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../process.css";
import checkLogo from "../images/check.svg";
import rightArrow from "../images/rightArrow.png";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Progress from "./components/Progress";

let date = new Date();
date.setDate(date.getDate() + 5);
let month = date.getMonth() + 1;
let day = date.getDate();

function Success() {
  const { state } = useLocation();
  const isRenting = state?.isRenting;
  const stdId = state?.stdId;
  const umbId = state?.umbId;
  // const outOfDate = state?.outOfDate;

  useEffect(() => {
    if (state === null) {
      window.history.back();
    }
  }, [state]);

  const returnDate = `반납 기한: ${String(month).padStart(2, "0")}월 \
  ${String(day).padStart(2, "0")}일 까지`;

  const returnMsg = "성공적으로 반납되었습니다.";

  console.log(state);

  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>
        <Progress progress={2} />

        <img src={checkLogo} alt="Check Sign" />
        <h2 className="process">처리완료</h2>
        <p className="info info-flex">
          {isRenting === true && (
            <>
              {stdId}
              <img className="right-arrow-success" src={rightArrow} alt="" />
              {umbId}
            </>
          )}
          {isRenting === false && (umbId + "번 우산 반납")}
        </p>
        <h3 className="warning">{isRenting === true ? returnDate : isRenting === false ? returnMsg : ""}</h3>
        <Link to="/">
          <Button btnText="돌아가기" />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Success;
// seungmin chun jae
