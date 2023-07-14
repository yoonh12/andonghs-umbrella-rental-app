import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";
import PropTypes from "prop-types";
import moment from "moment";

const qrURL = process.env.REACT_APP_QR_URL_PREFIX; // URL of QR Code e.g.) https://umbrella.andong.hs.kr/quick?umbid=100

const Scanner = ({
  isRenting,
  popRes,
  setPopRes,
  umbId,
  setUmbId,
  setShowAskPop,
  setShowAvailPop,
  setShowNoUmbPop,
}) => {
  const rentalDateDB = moment().format("YYYY-MM-DD HH:mm:ss");
  const returnDateDB = moment().add(5, "days").format("YYYY-MM-DD");

  const navigate = useNavigate();
  const { state } = useLocation(),
    stdId = state?.stdId;

  const handleDecode = useCallback(
    async (qrVal) => {
      const params = new URLSearchParams(qrVal);

      const queryStringValue = params.get(qrURL);

      if (queryStringValue?.length > 3) {
        return;
      }

      const umbId = Number(queryStringValue);
      console.log(queryStringValue);

      if (isNaN(umbId) || umbId <= 0) {
        navigate("/fail", { state: "QR provide an invalid value." });
        return;
      }

      if (popRes === false && isRenting === true) {
        setUmbId(umbId);
        setShowAskPop(true);
      } else if (popRes === true || isRenting === false) {
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + "/api", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              isRenting,
              stdId,
              umbId,
              rentalDate: rentalDateDB,
              returnDate: returnDateDB,
              check: false,
            }),
          });

          const { status } = response;
          const res = await response.json();
          console.log(res);

          if (res === true) {
            // if no umbrella on db
            setUmbId(umbId);
            setShowNoUmbPop(true);
          } else if (res.isAvailable === false) {
            setShowAskPop(false);
            setShowAvailPop(true);
          } else if (status === 200 && res.outOfDate !== undefined) {
            navigate("/delay", { state: { outOfDate: res.outOfDate } });
          } else if (status === 200) {
            navigate("/success", {
              state: {
                isRenting,
                stdId,
                umbId,
                outOfDate: res.outOfDate,
              },
            });
          } else {
            navigate("/fail", {
              state: status === 400 ? res : "Unknown Server Error.",
            });
          }
        } catch (err) {
          navigate("/fail", { state: err });
        }
      } else {
        navigate("/fail", { state: "Can't get respond from ScanRental" });
      }
    },
    [
      navigate,
      isRenting,
      popRes,
      stdId,
      setUmbId,
      setShowAskPop,
      setShowAvailPop,
      setShowNoUmbPop,
      rentalDateDB,
      returnDateDB,
    ]
  );

  useEffect(() => {
    if (popRes === true) {
      handleDecode(qrURL + "=" + umbId);
      setPopRes(false);
    }
  }, [popRes, handleDecode, umbId, setPopRes]);

  useEffect(() => {
    window.onpopstate = () => {
      console.log("Back");
      if (isRenting === true) {
        window.location.replace("/rental");
      } else {
        window.location.replace("/");
      }
    };
  }, [isRenting]);

  return (
    <QrScanner
      scanDelay={700}
      onDecode={handleDecode}
      onError={(err) => navigate("/fail", { state: err?.message })}
    />
  );
};

Scanner.propTypes = {
  isRenting: PropTypes.bool,
  popRes: PropTypes.bool,
  setPopRes: PropTypes.func,
  umbId: PropTypes.number,
  setUmbId: PropTypes.func,
  setShowAskPop: PropTypes.func,
  setShowAvailPop: PropTypes.func,
};

export default Scanner;
