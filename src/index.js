import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Rental from "./pages/FormRental";
import Return from "./pages/Return";
import ScanRental from "./pages/ScanRental";
import Success from "./pages/Success";
import HandleError from "./pages/Error";
import DirectProcess from "./DirectProcess";
import Info from "./pages/Info";
import Delay from "./pages/Delay";

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
