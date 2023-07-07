import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Progress from "../components/Progress";
import Scanner from "../components/utils/ScanDB";
import Popup from "../components/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

function Return() {
  const [showNoUmbPop, setShowNoUmbPop] = useState(false);
  const popNoUmb = useRef();

  const [umbId, setUmbId] = useState(0);

  const closeNoUmbPop = () => {
    setShowNoUmbPop(false);
  };

  const handleClickOutside = (e) => {
    if (popNoUmb.current && !popNoUmb.current.contains(e.target)) {
      setShowNoUmbPop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title">
          안동고등학교
          <br />
          우산 대여 서비스
        </h1>

        <Progress progress={0} />

        {showNoUmbPop && (
          <Popup
            popupRef={popNoUmb}
            onButtonClick={closeNoUmbPop}
            title={["음.. ", <FontAwesomeIcon key="icon" icon={faQuestion} />]}
            subTitle={umbId + "번 우산은 빌린 적이 없는걸요?"}
            buttonText="아.. 😏"
          />
        )}

        <p className="progress-status">우산 반납</p>
        <div className="scanner">
          <Scanner
            isRenting={false}
            setUmbId={setUmbId}
            setShowNoUmbPop={setShowNoUmbPop}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Return;
