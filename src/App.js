import Header from "./Components/Header/Header";
import "./App.css";
import Modal from "./Components/Modal/Modal";
import Notes from "./Components/Notes/Notes";
import Button from "./UI/AddButton";
import { useState } from "react";
import { NoteContext } from "./context/NoteContext";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({
    note: "",
    index: null,
  });

  function checkModal(isOpen) {
    setIsOpen(isOpen);
  }
  return (
    <div className="container">
      <NoteContext.Provider
        value={{
          notes,
          setNotes,
          filteredNotes,
          setFilteredNotes,
          selectedNote,
          setSelectedNote,
        }}
      >
        <Header />
        <Notes onEdit={checkModal} />
        {isOpen && <Modal isOpen={checkModal} />}
        <Button onOpen={checkModal} />
      </NoteContext.Provider>
    </div>
  );
}
export default App;
