import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Rental from './pages/Rental';
import Return from './pages/Return';
import Login from './pages/Login';
import AddBook from "./Database";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/return" element={<Return />} />
        <Route path="/admin" element={<Login />} />
        
        <Route path="/db" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
