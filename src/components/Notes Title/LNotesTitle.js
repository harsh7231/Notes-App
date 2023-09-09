import React from 'react'
import './LNotesTitle.css';
import UseContext from '../../useContext'

function LNotesTitle({ title }) {
    const { selected, setSelected } = UseContext();
    const nameInitals = (() => {
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
      setSelected(title[0].name);
    };
  
    return (
      <div
        onClick={handleTitleClick}
        className={`group_title_logo ${
          selected === title[0].name ? "highlighted_title" : null
        }`}
      >
        <div className="title_logo" style={{ backgroundColor: title[0].color }}>
          {nameInitals}
        </div>
        <div className="group_title">{newTitle}</div>
      </div>
    );
  }
  
  export default LNotesTitle;