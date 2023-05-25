// import Admin from "./Admin";
import "../form.css";
import { useState } from "react";

function Login() {
  const [userId, setUserId] = useState("");
  const [Passwd, setPasswd] = useState("");

  const onUsrId = (e) => {
    setUserId(e.target.value);
  };

  const onPassWd = (e) => {
    setPasswd(e.target.value);
  };

  return (
    <div>
      <h1 className="formTitle">Admin 로그인</h1>
      <form className="loginForm">
        <input name="email" type="email" onChange={onUsrId} value={userId} />
        <input
          name="password"
          type="password"
          onChange={onPassWd}
          value={Passwd}
        />
        <button className="formBtn" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
