// src/components/ParentComponent.js
import { useState, useEffect } from "react";
import ComposeEmail from "./ComposeEmail";
import DraftsSection from "./DraftsSection";
import axios from "axios";

const ParentComponent = () => {
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [showCompose, setShowCompose] = useState(false);

  const STORAGE_KEY = "emailDrafts";

  // Fetch drafts from the server on component mount
  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/drafts");
        setDrafts(response.data);
        // Optionally, save to local storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };

    fetchDrafts();
  }, []);

  // Function to save a draft (new or updated)
  const saveDraft = (newOrUpdatedDraft) => {
    setDrafts((prevDrafts) => {
      // Check if the draft already exists
      const existingDraftIndex = prevDrafts.findIndex(
        (draft) => draft._id === newOrUpdatedDraft._id
      );

      let updatedDrafts;
      if (existingDraftIndex !== -1) {
        // Update the existing draft
        updatedDrafts = [...prevDrafts];
        updatedDrafts[existingDraftIndex] = newOrUpdatedDraft;
      } else {
        // Add the new draft
        updatedDrafts = [newOrUpdatedDraft, ...prevDrafts];
      }

      // Save to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));

      return updatedDrafts;
    });
  };

  // Function to remove a draft from state (after deletion)
  const removeDraftFromState = (draftId) => {
    setDrafts((prevDrafts) => {
      const updatedDrafts = prevDrafts.filter((draft) => draft._id !== draftId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
      return updatedDrafts;
    });
  };

  // Function to open a draft for editing
  const openDraft = (draft) => {
    setSelectedDraft(draft);
    setShowCompose(true);
  };

  // Function to close the compose email modal
  const closeCompose = () => {
    setSelectedDraft(null);
    setShowCompose(false);
  };

  return (
    <div className="flex h-screen">
      <DraftsSection drafts={drafts} openDraft={openDraft} removeDraftFromState={removeDraftFromState} />
      {showCompose && (
        <ComposeEmail
          draft={selectedDraft}
          saveDraft={saveDraft}
          onClose={closeCompose}
          toggle={closeCompose}
        />
      )}
    </div>
  );
};

export default ParentComponent;








