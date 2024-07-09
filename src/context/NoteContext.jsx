import { createContext } from "react";

export const NoteContext = createContext({
  notes: [],
  filteredNotes: [],
  selectedNote: { note: "", index: null },
  setSelectedNote: () => { },
  setNotes: () => { },
  setFilteredNotes: () => { },
  setSearchInputValue: () => { },
  searchInputValue: ''
});
