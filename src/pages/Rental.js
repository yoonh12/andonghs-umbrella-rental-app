import "../form.css";
import { useState } from "react";
import Footer from "./components/Footer";

function Rental() {
  const [userId, setUserId] = useState("");
  // const [Passwd, setPasswd] = useState("");

  const onUserId = (e) => {
    setUserId(e.target.value);
  };

  // const onPassWd = (e) => {
  //   setPasswd(e.target.value);
  // };

  return (
    <div className="main">
      <div className="container">
        <h1 className="formTitle">우산 대여</h1>
        <form className="loginForm">
          <input
            name="userId"
            type="text"
            onChange={onUserId}
            value={userId}
            placeholder="학번"
          />
          {/* <input
            name="password"
            type="password"
            onChange={onPassWd}
            value={Passwd}
            placeholder="비밀번호"
          /> */}
          <button className="formBtnRental" type="submit">
            지금 대여하기!
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Rental;
