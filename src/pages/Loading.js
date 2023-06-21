import { useLocation, useNavigate } from "react-router-dom";

const Loading = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);

  setTimeout(() => {
    navigate(`/${state.isRenting ? "rental" : "return"}`);
  }, 2500);
  return <div>Loading... Please Wait...</div>;
};

export default Loading;
