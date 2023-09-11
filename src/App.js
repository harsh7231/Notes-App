import { useEffect, useState } from "react";
import "./App.css";
import Laptop from "./pages/Laptop";
import Phone from "./pages/Phone";
import MNotes from "./components/Notes/MNotes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "./useContext";
import UseContext from "./useContext";

function App() {
  const { selected, setSelected } = UseContext();

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
  }, [selected]);

  const isMobile = () => {
    return window.matchMedia("(max-width: 500px)").matches;
  };

  return (
    <Provider>
      <div className="App">
        {isMobile() ? (
          <Router>
            <Routes>
              <Route path="/" element={<Phone />} />
              <Route path="/notes" element={<MNotes />} />
            </Routes>
          </Router>
        ) : (
          <Laptop />
        )}
      </div>
    </Provider>
  );
}

export default App;
