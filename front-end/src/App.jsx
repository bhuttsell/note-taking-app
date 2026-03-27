import { useState, useEffect } from "react";
import Note from "./Note";

function App() {
  const [note, setNote] = useState("My first note");
  const [notes, setNotes] = useState([]);

  // Fetch all notes when the app loads
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5031/api/notes");
      const data = await response.json();
      console.log("fetch workd!");
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    try {
      const response = await fetch("http://localhost:5031/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note: note }),
      });
      console.log(response);
      if (response.ok) {
        const newNote = await response.json();
        setNotes([...notes, newNote]);
        setNote("");
        console.log("note saved to db!");
      } else {
        console.error("failed to save note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editNote = async (id, newText) => {
    // Get the note we're updating
    const noteToUpdate = notes.find((x) => x.id === id);

    // FIX THIS TOO OPTIMISTIC: Update the local state first (keep the object structure with id and note)
    const updatedNotes = notes.map((n, i) =>
      n.id === id ? { ...n, note: newText } : n
    );
    setNotes(updatedNotes);

    // Call API to update the record in the database
    try {
      const response = await fetch(
        `http://localhost:5031/api/notes/${noteToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ note: newText }),
        }
      );

      if (response.ok) {
        console.log("Note updated successfully in database!");
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5031/api/notes/${id}`, {
        method: "DELETE",
      });

      console.log(response);
      console.log(notes);
      if (response.ok) {
        setNotes(notes.filter((n) => n.id !== id));
        console.log(notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Note Taking App</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={addNote}
        >
          Add Note
        </button>
      </div>

      <div className="space-y-3">
        {notes.map((n, index) => (
          <Note
            key={n.id}
            noteText={n.note}
            id={n.id}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
