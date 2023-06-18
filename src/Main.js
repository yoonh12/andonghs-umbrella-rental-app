import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Rental from './pages/FormRental';
import Return from './pages/Return';
import ScanRental from "./pages/ScanRental";
import Success from "./pages/Success";
import HandleError from "./pages/Error";
import DirectProcess from "./DirectProcess";
import Info from "./pages/Info";
import Scanner from "./pages/components/ScanDB";

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
        <Route path="/ifu" element={<Info />} />
        <Route path="/quick" element={<DirectProcess />} />

        <Route path="/send" element={<Scanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
