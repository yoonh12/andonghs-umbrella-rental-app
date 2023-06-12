import { QrScanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Scanner = (props) => {
  const curDate = new Date();
  let year = curDate.getFullYear();
  let month = curDate.getMonth() + 1;
  let day = curDate.getDate();

  const rentalDateDB = `${year}-${month >= 10 ? month : "0" + month}-${
    day >= 10 ? day : "0" + day
  }`;

  curDate.setDate(curDate.getDate() + 5);
  year = curDate.getFullYear();
  month = curDate.getMonth() + 1;
  day = curDate.getDate();

  const returnDateDB = `${year}-${month >= 10 ? month : "0" + month}-${
    day >= 10 ? day : "0" + day
  }`;

  const navigate = useNavigate();

  const handleDecode = async (qrVal) => {
    const umbId = Number(qrVal);
    if (!isNaN(qrVal)) {
      try {
        const response = await fetch("https://api.neoflux.club/send", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state: props.state,
            stdId: props.stdId,
            umbId: umbId,
            rentalDate: rentalDateDB,
            returnDate: returnDateDB,
            check: false,
          }),
        });
        const status = response.status;
        const res = await response.json();
        console.log(status, res);
        navigate("/success", {
          state: {
            state: props.state,
            stdId: props.stdId,
            umbId: umbId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("올바르지 않은 QR");
    }
  };

  return (
    <QrScanner
      scanDelay={700}
      onDecode={handleDecode}
      onError={(err) => console.log(err?.message)}
    />
  );
};

Scanner.propTypes = {
  state: PropTypes.number,
  stdId: PropTypes.number,
};

export default Scanner;
