import { Link } from "react-router-dom";
import umbrellaLogo from "../images/umbrella.png";
// import Footer from "./components/Footer";

function Button(props) {
  return <button className="btn">{props.btnText}</button>;
}

function Home() {
  return (
    <div className="main">
      <div className="container">
        <img className="umbrella-logo" style={{ width: 150, margin: "10px" }} src={umbrellaLogo} alt="Umbrella Logo" />
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>
        <div className="btnCon">
          <Link to="/rental">
            <Button btnText="대여하기" />
          </Link>
          <Link to="/return">
            <Button btnText="반납하기" />
          </Link>
        </div>
        <p className="bottom-txt">
          <span className="license">LICENSE</span>
          <span className="copy">
            @AHS @<span className="neo">NEOFLUX</span>
          </span>
          <a className="ifu" href="neoflux.club">이용안내</a>
        </p>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
