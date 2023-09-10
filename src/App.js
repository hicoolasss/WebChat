import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './registration.css'
import Registration from './pages/Registration';
import LogIn from './pages/Log_in'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} index />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

