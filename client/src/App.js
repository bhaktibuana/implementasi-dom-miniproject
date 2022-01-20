import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { apiURL } from "./api/apiURL";
import About from "./pages/About/About";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage apiURL={apiURL} />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/signin" element={<SignIn />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="*" element={<NotFound />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
