import { Link, useLocation } from "react-router-dom";
import "../return.css";
import checkLogo from "../images/check.svg";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Progress from "./components/Progress";

let curDate = new Date();
let date = curDate.getDate();
let month = curDate.getMonth() + 1;
let year = curDate.getFullYear();

let reDate = curDate.getDate() + 5;
console.log(curDate.toLocaleDateString("ko-KR"));

function Success() {
  const { state } = useLocation();
  if (state == null) {
    window.history.back();
  }

  const curDate = `${year}/${month < 10 ? `0${month}` : `${month}`}/${
    date < 10 ? `0${date}` : `${date}`
  }`;

  const returnDate = `${year}/${month < 10 ? `0${month}` : `${month}`}/${
    date < 10 ? `0${reDate}` : `${reDate}`
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
        {/* <h1 className="title">
          {state === "rental" ? "대여가" : "반납이"} 완료되었습니다.
        </h1> */}
        <img src={checkLogo} alt="Check Sign" style={{ margin: "5px 0" }} />
        <p>대여 날자: {curDate}</p>
        <p>반납 기한: {returnDate}</p>
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
