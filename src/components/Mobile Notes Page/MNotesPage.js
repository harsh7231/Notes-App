import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MNotesPage.css";
import enter from "../../Assets/enter.png";
import back from "../../Assets/back.png";
import home from "../../Assets/home.png";
import MNotesContent from "../Notes Content/MNotesContent";
import UseContext from "../../useContext";

function MNotesPage() {
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [initials, setInitials] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const navigate = useNavigate();
  const { notes, setNotes, selected, setSelected } = UseContext();

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
    setNotes(JSON.parse(localStorage.getItem(selected)) || []);
    const groupNames = JSON.parse(localStorage.getItem("groupNames"));
    const selectedGroup = groupNames.find((group) => group.name === selected);
    if (selectedGroup) {
      setBgColor(selectedGroup.color);
      setInitials(
        selectedGroup.name
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .toUpperCase()
      );
      setSelectedTitle(
        selectedGroup.name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  }, [setSelected, setNotes, selected]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNotes();
    }
    else if(e.key === "Enter" && e.shiftKey){
      setText((prevText) => prevText + "\n");
    }
  };

  const handleSaveNotes = (e) => {
    const notes = JSON.parse(localStorage.getItem(selected)) || [];
    const newNoteObj = {
      id: Date.now(),
      title: selected,
      content: text,
      date: formatCurrentDate(),
      time: formatCurrentTime(),
    };
    notes.push(newNoteObj);
    localStorage.setItem(selected, JSON.stringify(notes));
    setText("");
    setNotes(notes);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const formatCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    const ampm = now.getHours() >= 12 ? "Pm" : "Am";
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatCurrentDate = () => {
    const now = new Date();
    const day = now.getDate().toString();
  const monthIndex = now.getMonth();
  const year = now.getFullYear().toString();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[monthIndex];
  return `${day} ${month} ${year}`;
};

  const goBack = () => {
    setSelected("");
    navigate("/");
  };

  return (
    <div className="m_notes_page">
      <div className="m_notes_content_title">
        <img src={back} alt="back" onClick={goBack} />
        <div
          className="m_notes_content_title_color"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div className="m_notes_content_title_text">
          {selectedTitle}
        </div>
      </div>
      <div className="m_notes_page_body">
        {notes.length === 0 ? (
          <div
            className="m_notes_page_body_empty"
            style={{ backgroundImage: `url(${home})` }}
          ></div>
        ) : (
          <div>
            {notes.map((note, index) => (
              <MNotesContent key={index} note={note} />
            ))}
          </div>
        )}
      </div>
      <div className="m_notes_input">
        <textarea
          value={text}
          placeholder="Enter your text here..........."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <img src={enter} alt="enter" onClick={handleSaveNotes} />
      </div>
    </div>
  );
}

export default MNotesPage;
