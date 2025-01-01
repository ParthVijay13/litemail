// src/components/DraftsSection.js
import axios from "axios";

const DraftsSection = ({ drafts, openDraft, removeDraftFromState }) => {
  // Function to handle deletion
  const handleDelete = async (draftId) => {
    try {
      await axios.delete(`http://localhost:5000/drafts/${draftId}`);
      // Remove from local state
      removeDraftFromState(draftId);
      alert("Draft deleted successfully!");
    } catch (error) {
      console.error("Error deleting draft:", error);
      alert("Failed to delete draft.");
    }
  };

  return (
    <div className="p-4 w-1/3 border-r">
      <h2 className="text-xl font-bold mb-4">Drafts</h2>
      {drafts.length > 0 ? (
        <ul className="space-y-2">
          {drafts.map((draft) => (
            <li
              key={draft._id}
              className="p-2 border rounded cursor-pointer hover:bg-gray-100 flex justify-between items-center"
            >
              <div onClick={() => openDraft(draft)} className="flex-1">
                <h3 className="font-medium">{draft.subject || "(No Subject)"}</h3>
                <p className="text-sm text-gray-600">
                  {draft.body ? draft.body.replace(/<[^>]+>/g, "").slice(0, 50) : ""}
                  ...
                </p>
              </div>
              <button
                onClick={() => handleDelete(draft._id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No drafts available.</p>
      )}
    </div>
  );
};

export default DraftsSection;
