import React from "react";
import "./MNotesTitle.css";
import { useNavigate } from "react-router-dom";
import UseContext from "../../useContext";

function MNotesTitle({ title }) {
  const navigate = useNavigate();
  const { setSelected } = UseContext();
  const initials = (() => {
    const words = title[0].name.split(" ");
    let initials = "";
  
    if (words.length === 1) {
      initials = words[0].slice(0, 2).toUpperCase();
    } else if (words.length === 2) {
      initials = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else if (words.length > 2) {
      initials = words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
    }
  
    return initials;
  })();
  
  const newTitle = title[0].name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const handleTitleClick = () => {
    localStorage.setItem("selected", title[0].name);
    setSelected(title[0].name);
    navigate("/notes");
  };
  return (
    <div onClick={handleTitleClick} className="m_notes">
      <div
        className="m_notes_icon"
        style={{ backgroundColor: title[0].color }}
      >
        {initials}
      </div>
      <div className="m_notes_title">{newTitle}</div>
    </div>
  );
}

export default MNotesTitle;
