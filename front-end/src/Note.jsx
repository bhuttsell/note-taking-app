import { useState } from "react";

function Note({ noteText, id, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(noteText);

  const handleSave = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="flex-1 text-gray-800">{noteText}</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
