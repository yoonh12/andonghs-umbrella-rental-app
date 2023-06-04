import "../form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Footer from "./components/Footer";

function Rental() {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setStudentId(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/scan", { state: { studentId } });
  };

  return (
    <div className="main">
      <div className="container">
        <h1 className="formTitle">우산 대여</h1>
        <form className="loginForm" onSubmit={onSubmit}>
          <input
            name="studentId"
            type="number"
            onChange={onChange}
            value={studentId}
            placeholder="학번"
          />
          <button className="formBtnRental" type="submit">
            지금 대여하기!
          </button>
        </form>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Rental;
