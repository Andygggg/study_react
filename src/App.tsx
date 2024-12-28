import "./App.css";
import Welcome from "./views/WelcomeReact";
import TestBootstrap from "./views/TestBootstrap";
import List from "./views/Week1List";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const goToWelcome = () => {
    navigate("/");
  };

  const goToWeek1List = () => {
    navigate("/Week1List");
  };

  return (
    <div className="menu_navbar">
      <button className="btn btn-primary" onClick={goToWelcome}>練習Bootstrap</button>
      <button className="btn btn-primary" onClick={goToWeek1List}>第一周作業</button>
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="outer_box">
          <div className="left_area">
            <Welcome />
          </div>
          <div className="right_area">
            <Navigation />
            <Routes>
              <Route path="/" element={<TestBootstrap />} />
              <Route path="/Week1List" element={<List />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
