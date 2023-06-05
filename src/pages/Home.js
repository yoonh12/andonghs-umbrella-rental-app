import { Link } from "react-router-dom";
import umbrellaLogo from "../images/umbrella.svg";
import Button from "./components/Button";

function Home() {
  return (
      <div className="container">
        <img className="umbrella-logo" src={umbrellaLogo} alt="Umbrella Logo" />
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>
        <div className="btn-con">
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
  );
}

export default Home;
