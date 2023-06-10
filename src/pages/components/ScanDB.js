import { QrScanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const curDate = new Date();
let year = curDate.getFullYear();
let month = curDate.getMonth() + 1;
let day = curDate.getDate();

const Scanner = (props) => {
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
  return (
    <QrScanner
      scanDelay={700}
      onDecode={(qrVal) => {
        const umbId = Number(qrVal);
        if (!isNaN(qrVal)) {
          fetch("http://localhost:3001/send", {
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
          })
            .then((response) => response.json())
            .then((res) => {
              console.log(res);
              navigate("/success", {
                state: {
                  state: props.state,
                  stdId: props.stdId,
                  umbId: umbId,
                },
              });
            });
        } else {
          alert("올바르지 않은 QR");
        }
      }}
      onError={(err) => console.log(err?.message)}
    />
  );
};

export default Scanner;

Scanner.propTypes = {
  state: PropTypes.number,
  stdId: PropTypes.number,
};
