import Header from './Components/Header/Header';
import './App.css';
import EmptyList from './Components/EmptyList/EmptyList';
import Modal from './Components/Modal/Modal'
import Notes from './Components/Notes/Notes';
import Button from './UI/AddButton';
import { useState } from 'react';
import {NoteContext} from './context/NoteContext';

function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState([])



  console.log(notes);

  function checkModal(isOpen) {
    setIsOpen(isOpen)
  }
  console.log(notes);
  return (
    <div className="container">
      <Header />

      <NoteContext.Provider value={{ notes, setNotes }}>

        <EmptyList />

        <Notes />

      </NoteContext.Provider>


      <Button onOpen={checkModal} />
      {isOpen && <Modal isOpen={checkModal} />}
    </div>
  )
}
export default App;
