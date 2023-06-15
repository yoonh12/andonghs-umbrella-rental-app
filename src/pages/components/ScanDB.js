import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";
import PropTypes from "prop-types";
import moment from "moment";

const Scanner = ({ state, stdId, setShowPopup }) => {
  const rentalDateDB = moment().format("YYYY-MM-DD");
  const returnDateDB = moment().add(5, "days").format("YYYY-MM-DD");

  const navigate = useNavigate();

  const handleDecode = useCallback(
    async (qrVal) => {
      const umbId = Number(qrVal);

      if (isNaN(umbId)) {
        navigate("/fail", { state: "QR provide an invalid value." });
        return;
      }

      console.log(umbId + "번 우산이 맞나요?");

      try {
        const response = await fetch("https://api.neoflux.club/send", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state,
            stdId,
            umbId,
            rentalDate: rentalDateDB,
            returnDate: returnDateDB,
            check: false,
          }),
        });

        const { status } = response;
        const res = await response.json();
        console.log(status, res);

        if (res.isAvailable === false) {
          setShowPopup(true);
        } else if (status === 200) {
          navigate("/success", {
            state: {
              state,
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
    },
    [navigate, state, stdId, rentalDateDB, returnDateDB, setShowPopup]
  );

  return (
    <QrScanner
      scanDelay={700}
      onDecode={handleDecode}
      onError={(err) => navigate("/fail", { state: err?.message })}
    />
  );
};

Scanner.propTypes = {
  state: PropTypes.number,
  stdId: PropTypes.number,
  setShowPopup: PropTypes.func,
};

export default Scanner;
