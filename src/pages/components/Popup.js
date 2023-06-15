import { useState } from "react";
import "../../layerpop.css";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Popup(props) {
  const [popOn, setPopOn] = useState(false);
  setTimeout(() => {
    setPopOn(true);
  }, 0);
  // console.log(popOn);
  return (
    <>
      <div className={"overlay " + (props.showChat && "overlay-under") + " " + (popOn ? "show" : "hide")} />
      <div className={"popup-wrapper " + (props.showChat && "popup-under")}>
        <div
          className={"popup-content " + (popOn ? "show" : "hide")}
          ref={props.popupRef}
        >
          {props.hasCloseBtn && (
            <button className="popup-close" onClick={props.onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
          <h1>{props.title}</h1>
          <h2>{props.subTitle}</h2>
          {props.smallText && <h3>{props.smallText}</h3>}
          <Button btnText={props.buttonText} onClick={props.onButtonClick} />
        </div>
      </div>
    </>
  );
}

export default Popup;
