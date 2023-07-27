import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/home";
import Rental from "./pages/formRental";
import Return from "./pages/return";
import ScanRental from "./pages/scanRental";
import Success from "./pages/success";
import HandleError from "./pages/error";
import DirectProcess from "./directReturn";
import Info from "./pages/info";
import Delay from "./pages/delay";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/return" element={<Return />} />
        <Route path="/scan" element={<ScanRental />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<HandleError />} />
        <Route path="/delay" element={<Delay />} />
        <Route path="/ifu" element={<Info />} />
        <Route path="/quick" element={<DirectProcess />} />
      </Routes>
    </BrowserRouter>
  );
}
root.render(<App />);

// Notification.requestPermission();
serviceWorkerRegistration.unregister();
