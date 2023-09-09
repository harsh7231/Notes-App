import React, { useEffect, useState, useRef} from "react";
import "./Sidebar.css";
import CreateNotes from "../Create Notes/CreateNotesL";
import LNotesTitle from "../Notes Title/LNotesTitle";

function Sidebar() {
  const [titles, setTitles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [groupNamesParent, setGroupNamesParent] = useState(
    JSON.parse(localStorage.getItem("groupNames")) || []
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
    <div className="sidebar">
      <div className="sidebar_title">Pocket Notes</div>
      <div className="sidebar_create_notes_btn">
        <button onClick={handleClick}>
          <span id="add">+</span>
          <span>Create Notes Group</span>
        </button>
      </div>
      <div className="sidebar_notes_title">
        {titles.length > 0 ? (
          titles.map((title, index) => <LNotesTitle key={index} title={title} />)
        ) : (
          <div>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="popup_overlay">
          <div ref={popupRef}>
            <CreateNotes
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

export default Sidebar;
