import React, { useState } from "react";
import "./CreateNotesL.css";

function CreateNotesL({ groupNamesParent, setGroupNamesParent, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [groupNameError, setGroupNameError] = useState("");

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
    setGroupNameError("");
  };

  const handleColor = (e) => {
    const div = e.target;
    setBgColor(getComputedStyle(div).backgroundColor);
  };

  const saveName = () => {
    setShowErrors(true);
    if (groupName.trim() === "") {
      setGroupNameError("Group name is empty");
    } 
    else{
      const newGroup = { name: groupName, color: bgColor };
      setGroupNamesParent([...groupNamesParent, newGroup]);
      localStorage.setItem("groupNames", JSON.stringify([...groupNamesParent, newGroup]));
      onClose();
    }
  };

  return (
    <div className="popup">
      <div className="popup_title">Create New Notes Group</div>
      <div className="popup_input">
        <span>Group Name</span>
        <input
          value={groupName}
          onChange={handleGroupName}
          type="text"
          placeholder="Enter your group name...."
        />
      </div>
            {showErrors && <p className="errorText">{groupNameError}</p>}
      <div className="popup_choose_color">
        <span>Choose Color</span>
        <div className="popup_color">
          <div
            className={'popup_color_1'}
            onClick={handleColor}
          ></div>
          <div
            className={'popup_color_2'}
            onClick={handleColor}
          ></div>
          <div
            className={'popup_color_3'}
            onClick={handleColor}
          ></div>
          <div
            className={'popup_color_4'}
            onClick={handleColor}
          ></div>
          <div
            className={'popup_color_5'}
            onClick={handleColor}
          ></div>
          <div
            className={'popup_color_6'}
            onClick={handleColor}
          ></div>
        </div>
      </div>
      <div className="popup_close">
        <button onClick={saveName}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateNotesL;
