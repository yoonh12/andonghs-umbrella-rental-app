import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Rental from './pages/Rental';
import Return from './pages/Return';
import ScanRental from "./pages/ScanRental";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/return" element={<Return />} />
        <Route path="/scan" element={<ScanRental />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
