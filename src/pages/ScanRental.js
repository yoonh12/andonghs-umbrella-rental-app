import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Scanner from "./components/ScanDB";

function ScanRental() {
  const { state } = useLocation();
  return (
    <div className="main">
      <div className="container">
        <h1 className="title">대여할 우산을 스캔해 주세요.</h1>
        <Scanner stats="rental" stateStdId={state.studentId} />
      </div>
      <Footer />
    </div>
  );
}

export default ScanRental;
