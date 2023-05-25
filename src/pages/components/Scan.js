import { QrScanner } from "@yudiel/react-qr-scanner";

const Scanner = () => (
  <QrScanner
    onDecode={(result) => console.log(result)}
    onError={(err) => console.log(err?.message)}
  />
);

export default Scanner;
