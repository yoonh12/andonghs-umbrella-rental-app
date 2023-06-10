import { Link } from "react-router-dom";
import umbrellaLogo from "../images/umbrella.svg";
import Button from "./components/Button";

function onClick() {
  console.log("It works!");
}

function Home() {
  return (
    <>
      <div className="container ignore-height">
        <div className="logo-container">
          <img
            className="umbrella-logo"
            src={umbrellaLogo}
            alt="Umbrella Logo"
          />
        </div>
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
            <a
              href="http://school.gyo6.net/andonghs"
              target="_blank"
              rel="noreferrer"
            >
              @AHS
            </a>{" "}
            <a href="https://neoflux.club" target="_blank" rel="noreferrer">
              @<span className="neo">NEOFLUX</span>
            </a>
          </span>
          <button className="ifu" onClick={onClick}>
            이용안내
          </button>
        </p>
      </div>
    </>
  );
}

export default Home;
