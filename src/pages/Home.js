import { Link, useNavigate } from "react-router-dom";
import umbrellaLogo from "../images/umbrella.svg";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();
  const onClickIfu = () => {
    navigate("/ifu");
  };

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
          <Link to="/return" state={{ isRenting: false }}>
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
            @<span className="neo">NEOFLUX</span>
          </span>
          <button className="ifu" onClick={onClickIfu}>
            이용안내
          </button>
        </p>
      </div>
    </>
  );
}

export default Home;
