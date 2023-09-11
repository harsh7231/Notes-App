import React, { useState, useEffect, useRef } from "react";
import "./Phone.css";
import CreateNotesM from "../../src/components/Create Notes/CreateNotesM";
import MNotesTitle from "../../src/components/Notes Title/MNotesTitle";

function Phone() {
  const [titles, setTitles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [groupNamesParent, setGroupNamesParent] = useState(
    localStorage.getItem("groupNames") || []
  );

  useEffect(() => {
    const data = localStorage.getItem("groupNames");
    if (data) {
      setGroupNamesParent(JSON.parse(data));
    } else {
      setGroupNamesParent([]);
    }
  }, []);

  useEffect(() => {
    if (groupNamesParent.length > 0) {
      const obj = JSON.parse(localStorage.getItem("groupNames"));
      const result = Object.keys(obj).map((key) => [obj[key]]);
      setTitles(result);
    }
  }, [groupNamesParent]);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };
  
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return() =>{
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPopup]);

  return (
    <div className="mobile_sidebar">
      <div className="mobile_sidebar_title">Pocket Notes</div>
      <div className="mobile_sidebar_create_notes_btn">
        <button onClick={handleClick}>
          <span id="add">+</span>
          <span>Create Notes Group</span>
        </button>
      </div>
      <div className="mobile_sidebar_notes_title">
        {(
          titles.map((title, index) => (
            <MNotesTitle
              title={title}
              key={index}
            />
          ))
        )}
      </div>
      {showPopup && (
        <div className="mobile_popup_overlay">
        <div ref={popupRef}>
            <CreateNotesM
              groupNamesParent={groupNamesParent}
              setGroupNamesParent={setGroupNamesParent}
              onClose={handleClose}
            />
            </div>
        </div>
      )}
    </div>
  );
}

export default Phone;
