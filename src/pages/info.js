import { Link } from "react-router-dom";
import Button from "../components/button";
import Footer from "../components/footer";

function Info() {
  return (
    <>
      <div className="container">
        <h1>우산 대여 방법</h1>
        <h2>1. "대여하기" 버튼을 누른다.</h2>
        <h2>2. 대여하고자 하는 우산을 고른다.</h2>
        <h2>3. 우산 거치대의 QR코드를 스캔한다.</h2>

        <h1>우산 반납 방법</h1>
        <h2>1. "반납하기" 버튼을 누른다.</h2>
        <h2>2. 자신이 대여했던 우산을 올바른 위치에 반납한다.</h2>
        <h2>3. 우산 거치대의 QR코드를 스캔한다.</h2>
        <Link to="/">
          <Button btnText="돌아가기" />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Info;
