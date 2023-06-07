import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Scanner from "./components/ScanDB";
import Progress from "./components/Progress";

function ScanRental() {
  const { state } = useLocation();
  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>

        <Progress progress={1} />
        <p className="progress-status">우산 대여</p>
        <Scanner stats="rental" stateStdId={state.studentId} />
      </div>
      <Footer />
    </>
  );
}

export default ScanRental;
