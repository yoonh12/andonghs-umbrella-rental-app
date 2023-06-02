import { QrScanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

const Scanner = (props) => {
  const navigate = useNavigate();
  return (
    <QrScanner
      scanDelay={700}
      onDecode={(umbrellaId) => {
        fetch("http://localhost:3001/send", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stats: props.stats,
            stdId: props.stateStdId,
            umbId: umbrellaId,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            // window.alert(res);
            // window.history.back();
            navigate("/success", { state: props.stats });
          });
      }}
      onError={(err) => console.log(err?.message)}
    />
  );
};

export default Scanner;
