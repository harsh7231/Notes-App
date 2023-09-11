import { useContext } from "react";
import { createContext, useState } from "react";
const setContext = createContext({
  notes: [],
  setNotes: () => {},
  selected: "",
  setSelected: () => {},
});

const Provider = ({ children }) => {
  const [selected, setSelected] = useState(""); // eslint-disable-line
  const [notes, setNotes] = useState([]); // eslint-disable-line

  const valueToShare = {
    notes,
    setNotes,
    selected,
    setSelected,
  };

  return (
    <setContext.Provider value={valueToShare}>
      {children}
    </setContext.Provider>
  );
};

const UseContext = () => {
  return useContext(setContext);
}
export { Provider };
export default UseContext;
