import "../form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

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
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>



        <form className="stdForm" onSubmit={onSubmit}>
          <label htmlFor="stdId">인적 사항</label>
          <input
            name="studentId"
            id="stdId"
            type="number"
            onChange={onChange}
            value={studentId}
            placeholder="학번을 입력해 주세요."
          />
          <button className="formBtnRental" type="submit">
            
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Rental;
