import { useState } from "react";
import "../styles/layerpop.css";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Popup(props) {
  const [popOn, setPopOn] = useState(false);
  setTimeout(() => {
    setPopOn(true);
  }, 0);

  return (
    <>
      <div
        className={
          "overlay " +
          (props.showChat && "overlay-under") +
          " " +
          (popOn ? "show" : "hide")
        }
      />
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
          {props.buttonTextYes && props.buttonTextCancel !== null ? (
            <>
              <div className="popup-small-buttons">
                <button
                  className="btn half mr-5"
                  onClick={props.onButtonClickYes}
                >
                  {props.buttonTextYes}
                </button>
                <button
                  className="btn half ml-5"
                  onClick={props.onButtonClickNo}
                >
                  {props.buttonTextCancel}
                </button>
              </div>
            </>
          ) : (
            <Button btnText={props.buttonText} onClick={props.onButtonClick} />
          )}
        </div>
      </div>
    </>
  );
}

export default Popup;
