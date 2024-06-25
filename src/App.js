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

  function checkModal(isOpen) {
    setIsOpen(isOpen);
  }
  return (
    <div className="container">
      <NoteContext.Provider
        value={{ notes, setNotes, filteredNotes, setFilteredNotes }}
      >
        <Header />
        <Notes />
        {isOpen && <Modal isOpen={checkModal} />}
      </NoteContext.Provider>

      <Button onOpen={checkModal} />
    </div>
  );
}
export default App;
