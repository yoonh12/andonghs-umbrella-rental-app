import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";
import PropTypes from "prop-types";
import moment from "moment";

const URL = "https://umbrella.andonghs.kr/quick?umbId"; // Domain of QR Code

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
  // const [sc, setSc] = useState(true);

  const rentalDateDB = moment().format("YYYY-MM-DD");
  const returnDateDB = moment().add(5, "days").format("YYYY-MM-DD");

  const navigate = useNavigate();
  const { state } = useLocation(),
    stdId = state?.stdId;

  const handleDecode = useCallback(
    async (qrVal) => {
      const params = new URLSearchParams(qrVal);

      const queryStringValue = params.get(URL);

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
          const response = await fetch("https://api.neoflux.club/send", {
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
          } else if (status === 200 && res.outOfDate === undefined) {
            navigate("/success", {
              state: {
                isRenting,
                stdId,
                umbId,
                outOfDate: res.outOfDate,
              },
            });
          } else if (res.outOfDate !== undefined) {
            navigate("/delay", { state: { outOfDate: res.outOfDate } });
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
      handleDecode(URL + "=" + umbId);
      setPopRes(false);
    }
  }, [popRes, handleDecode, umbId, setPopRes]);

  useEffect(() => {
    return () => {
      // setSc(false);
    };
  }, []);

  return (
    <QrScanner
      tracker={false}
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
