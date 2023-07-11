import "../styles/progress-bar.css";

function Progress(props) {
  let color1, color2;

  if (props.progress === 0) {
    color1 = "blue";
    color2 = "white";
  } else if (props.progress === 1) {
    color1 = "lime";
    color2 = "blue";
  } else if (props.progress === 2) {
    color1 = "lime";
    color2 = "lime";
  } else {
    color1 = "white";
    color2 = "white";
  }

  return (
    <div className="progress-con">
      <div className="circle" style={{ backgroundColor: color1 }}></div>
      <div className="horizontal"></div>
      <div className="circle2" style={{ backgroundColor: color2 }}></div>
    </div>
  );
}

export default Progress;
