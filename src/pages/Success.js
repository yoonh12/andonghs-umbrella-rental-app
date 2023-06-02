import "../return.css";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";

let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

function Success() {
  const { state } = useLocation();
  if (state == null) {
    window.history.back();
  }
  const curDate = `${year}/${month < 10 ? `0${month}` : `${month}`}/${
    date < 10 ? `0${date}` : `${date}`
  }`;

  return (
    <div className="main">
      <div className="container">
        <h1 className="title">
          {state == "rental" ? "대여가" : "반납이"} 완료되었습니다.<br/>
          {curDate}
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default Success;
