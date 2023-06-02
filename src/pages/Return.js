import "../return.css";
import Footer from "./components/Footer";
import Scanner from "./components/ScanDB";

function Return() {
  return (
    <div className="main">
      <div className="container">
        <h1 className="title">반납할 우산을 스캔해 주세요.</h1>
        <Scanner stats="return" />
      </div>
        <Footer />
    </div>
  );
}

export default Return;
