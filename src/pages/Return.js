import "../return.css";
import Footer from "./components/Footer";
import Progress from "./components/Progress";
import Scanner from "./components/ScanDB";


function Return() {
  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>

        <Progress progress={0} />
        <p>우산 반납</p>
        <Scanner stats="return" />
      </div>
      <Footer />
    </>
  );
}

export default Return;
