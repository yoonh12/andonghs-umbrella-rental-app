import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Scanner from "./components/Scan";

function Button(props) {
  return <button className="btn">{props.btnText}</button>;
}

function Home() {
  return (
    <div className="main">

      <div className="container">
        <h1 className="title">우산 대여 서비스</h1>
        <div className="btnCon">
          <Link to="/rental">
            <Button btnText="대여" />
          </Link>
          <Link to="/return">
            <Button btnText="반납" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
