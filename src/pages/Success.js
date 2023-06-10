import { Link, useLocation } from "react-router-dom";
import "../success.css";
import checkLogo from "../images/check.svg";
import rightArrow from "../images/rightArrow.png";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Progress from "./components/Progress";

let date = new Date();
date.setDate(date.getDate() + 5);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

function Success() {
  const {
    state: { state, stdId, umbId },
  } = useLocation();
  if (state == null) {
    // window.history.back(); // prevent direct access to the page.
  }

  const returnDate = `반납 기한: ${month < 10 ? `0${month}` : `${month}`}월 ${
    day < 10 ? `0${day}` : `${day}일`
  }`;

  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>
        <Progress progress={2} />
        <img src={checkLogo} alt="Check Sign" style={{ margin: "5px 0 0" }} />
        <h2 className="succeed">처리완료</h2>
        <p className="info">
          {state === 0 && (
            <>
              {stdId}
              <img className="right-arrow-success" src={rightArrow} alt="" />
            </>
          )}
          {umbId}번 우산{state === 1 && "반납"}
        </p>
        <h3 className="warning">{state === 0 && returnDate}</h3>
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
