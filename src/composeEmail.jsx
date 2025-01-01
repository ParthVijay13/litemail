// import {useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useDropzone } from "react-dropzone";
// import { useDispatch, useSelector } from "react-redux";
// import { addDraft, updateDraft, removeDraft } from "../slices/draftsSlice";

// const ComposeEmail = ({ onClose, toggle, existingDraft = null }) => {
//   const dispatch = useDispatch();
//   const drafts = useSelector((state) => state.drafts); // Access drafts state from Redux

//   // State for email fields using the existing draft if provided
//   const draftId = existingDraft?.id || null;
//   const [to, setTo] = useState(existingDraft?.to || "");
//   const [subject, setSubject] = useState(existingDraft?.subject || "");
//   const [body, setBody] = useState(existingDraft?.body || "");
//   const [attachments, setAttachments] = useState(existingDraft?.attachments || []);
//   const saveIntervalRef = useRef(null);

//   // File drop handler
//   const onDrop = (acceptedFiles) => {
//     setAttachments([...attachments, ...acceptedFiles]);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   // Save draft to Redux store
//   const saveDraftToRedux = () => {
//     const draft = { id: draftId || Date.now(), to, subject, body, attachments };
//     if (draftId) {
//       dispatch(updateDraft(draft)); // Update existing draft
//     } else {
//       dispatch(addDraft(draft)); // Add new draft
//     }
//   };

//   // Start auto-saving every 30 seconds
//   useEffect(() => {
//     saveIntervalRef.current = setInterval(saveDraftToRedux, 30000);
//     return () => clearInterval(saveIntervalRef.current); // Cleanup on unmount
//   }, [to, subject, body, attachments, dispatch, draftId]);

//   // Clear draft from Redux and reset fields
//   const clearDraft = () => {
//     if (draftId) {
//       dispatch(removeDraft(draftId)); // Remove draft from Redux
//     }
//     setTo("");
//     setSubject("");
//     setBody("");
//     setAttachments([]);
//   };

//   // Submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!to) {
//       alert("Recipient (To) is required!");
//       return;
//     }
//     console.log("Email Sent:", { to, subject, body, attachments });
//     alert("Email sent successfully!");
//     clearDraft();
//     onClose();
//   };

//   return (
//     <div className="fixed right-0 top-0 bg-white shadow-lg w-[50vw] max-w-lg h-full md:h-auto md:rounded-lg p-6 md:mt-10 md:mr-10 overflow-y-auto font-sans">
//       <button
//         onClick={() => {
//           clearDraft();
//           onClose();
//           toggle();
//         }}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
//       >
//         &#10005;
//       </button>
//       <h2 className="text-2xl font-bold mb-4">Compose Email</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">To:</label>
//           <input
//             type="email"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter recipient email"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Subject:</label>
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter email subject"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Body:</label>
//           <ReactQuill value={body} onChange={setBody} placeholder="Write your email here..." />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Attachments:</label>
//           <div
//             {...getRootProps({
//               className:
//                 "dropzone border-2 border-dashed border-blue-500 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50",
//             })}
//           >
//             <input {...getInputProps()} />
//             <p>Drag & drop files here, or click to select files</p>
//           </div>
//           <ul>
//             {attachments.map((file, index) => (
//               <li key={index}>{file.name}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={() => {
//               clearDraft();
//               onClose();
//             }}
//             className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
//           >
//             Send Email
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ComposeEmail;

// import uniqid from 'uniqid';



// import { useState, useEffect, useRef,useCallback } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useDropzone } from "react-dropzone";
// import { useDispatch, useSelector } from "react-redux";
// import { addDraft, updateDraft, removeDraft } from "../slices/draftsSlice";
// import axios from 'axios';
// const ComposeEmail = ({ onClose, toggle, existingDraft}) => {
//   const dispatch = useDispatch();
//   const drafts = useSelector((state) => state.drafts); // Access drafts state from Redux
//   console.log("This is the draft from useSelect",drafts);
  
//   const draftId = existingDraft?.id || null;
//   // console.log(draftId);
  
//   const [to, setTo] = useState(existingDraft?.to || "");
//   const [subject, setSubject] = useState(existingDraft?.subject || "");
//   const [body, setBody] = useState(existingDraft?.body || "");
//   const [attachments, setAttachments] = useState(existingDraft?.attachments || []);
//   const saveIntervalRef = useRef(null);

//   // Retrieve draft from local storage on mount
//   useEffect(() => {
//     const savedDraft = JSON.parse(localStorage.getItem("draft"));
//     if (savedDraft) {
//       setTo(savedDraft.to || "");
//       setSubject(savedDraft.subject || "");
//       setBody(savedDraft.body || "");
//       setAttachments(savedDraft.attachments || []);
//     }
//   }, []);

//   // Save draft to local storage on change
//   useEffect(() => {
//     const draft = { to, subject, body, attachments };
//     localStorage.setItem("draft", JSON.stringify(draft));
//   }, [to, subject, body, attachments]);

//   // const saveToDatabase = async () => {
//   //   const draft = { id: draftId || null, to, subject, body, attachments };
//   //   try {
//   //     await axios.post('http://localhost:5000/save-email', draft);
//   //     console.log('Data saved to database');
//   //   } catch (error) {
//   //     console.error('Error saving to database:', error.message);
//   //   }
//   // };
  
//   // const saveToDatabase = useCallback(() => {
//   //   const draft = { to, subject, body, attachments };

//   //   // Replace with your database save logic
//   //   console.log('Saving draft to database:', draft);
//   // }, [to, subject, body, attachments]);

//   const saveToDatabase = useCallback(() => {
//     const draft = { to, subject, body, attachments };
  
//     // Make sure to send data to your backend (Express server)
//     axios
//       .post("http://localhost:5000/save-email", draft)
//       .then((response) => {
//         console.log("Draft saved to database:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error saving draft to database:", error);
//       });
      
//   }, [to, subject, body, attachments]);

//   useEffect(() => {
//     saveIntervalRef.current = setInterval(saveToDatabase, 30);
//     return () => clearInterval(saveIntervalRef.current); // Cleanup on unmount
//   }, [saveToDatabase]);
  

//   // useEffect(() => {
//   //   const handleUnload = () => {
//   //     saveToDatabase(); // Ensure data is saved before the page unloads
//   //   };

//   //   window.addEventListener('beforeunload', handleUnload);
//   //   return () => {
//   //     window.removeEventListener('beforeunload', handleUnload);
//   //   };
//   // }, [saveToDatabase]); // Add saveToDatabase to the dependency array

//   // File drop handler
//   const onDrop = (acceptedFiles) => {
//     const updatedAttachments = [...attachments, ...acceptedFiles];
//     setAttachments(updatedAttachments);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   // const saveDraftToRedux = () => {
//   //   const draft = { id: draftId || Date.now(), to, subject, body, attachments };
//   //   if (draftId) {
//   //     dispatch(updateDraft(draft)); // Update existing draft
//   //   } else {
//   //     dispatch(addDraft(draft)); // Add new draft
//   //   }
//   // };

//   // Start auto-saving every 30 seconds
//   const saveDraftToRedux = useCallback(() => {
//     const draft = { id:draftId|| Date.now(), to, subject, body, attachments };
//     console.log(draftId);
    

//     // Replace with your Redux dispatch logic
//     if (draftId) {
//       dispatch(updateDraft(draft)); // Update existing draft
//     } else {
//       dispatch(addDraft(draft)); // Add new draft
//     }
//   }, [draftId, to, subject, body, attachments, dispatch]);

//   useEffect(() => {
//     saveIntervalRef.current = setInterval(saveDraftToRedux, 30000);
//     return () => clearInterval(saveIntervalRef.current); // Cleanup on unmount
//   }, [saveDraftToRedux]); 

//   const clearDraft = () => {
//     if (draftId) {
//       dispatch(removeDraft(draftId)); // Remove draft from Redux
//     }
//     setTo("");
//     setSubject("");
//     setBody("");
//     setAttachments([]);
//     localStorage.removeItem("draft");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!to) {
//       alert("Recipient (To) is required!");
//       return;
//     }
//     console.log("Email Sent:", { to, subject, body, attachments });
//     alert("Email sent successfully!");
//     clearDraft();
//     onClose();
//   };

//   return (
//     <div className="fixed right-0 top-0 bg-white shadow-lg w-[50vw] max-w-lg h-full md:h-auto md:rounded-lg p-6 md:mt-10 md:mr-10 overflow-y-auto font-sans">
//       <button
//         onClick={() => {
//           clearDraft();
//           onClose();
//           toggle();
//         }}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
//       >
//         &#10005;
//       </button>
//       <h2 className="text-2xl font-bold mb-4">Compose Email</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">To:</label>
//           <input
//             type="email"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter recipient email"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Subject:</label>
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter email subject"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Body:</label>
//           <ReactQuill value={body} onChange={setBody} placeholder="Write your email here..." />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Attachments:</label>
//           <div
//             {...getRootProps({
//               className:
//                 "dropzone border-2 border-dashed border-blue-500 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50",
//             })}
//           >
//             <input {...getInputProps()} />
//             <p>Drag & drop files here, or click to select files</p>
//           </div>
//           <ul>
//             {attachments.map((file, index) => (
//               <li key={index}>{file.name}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={() => {
//               clearDraft();
//               onClose();
//             }}
//             className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
//           >
//             Send Email
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ComposeEmail;





// Try and checking something if can be make better than before


// ComposeEmail.js
// src/components/ComposeEmail.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import debounce from "lodash.debounce";
import Draggable from "react-draggable";

const ComposeEmail = ({ onClose, saveDraft, draft }) => {
  const [to, setTo] = useState(draft?.to || "");
  const [subject, setSubject] = useState(draft?.subject || "");
  const [body, setBody] = useState(draft?.body || "");
  const [attachments, setAttachments] = useState(draft?.attachments || []);

  const quillRef = useRef(null); // Ref for ReactQuill

  // Function to save draft to database
  const saveToDatabase = useCallback(async () => {
    const draftData = {
      _id: draft?._id || null, // Use _id if it exists; otherwise, null
      to,
      subject,
      body,
      attachments: attachments.map((file) => file.name), // Store only file names
    };

    try {
      const response = await axios.post("http://localhost:5000/save-email", draftData);
      console.log("Draft saved to database:", response.data);
      saveDraft(response.data); // Update parent with the latest draft (including _id)
    } catch (error) {
      console.error("Error saving draft to database:", error);
    }
  }, [draft?._id, to, subject, body, attachments, saveDraft]);

  // Debounced version of saveToDatabase to prevent frequent saves
  const debouncedSave = useRef(
    debounce(() => {
      if (to || subject || body || attachments.length) {
        saveToDatabase();
      }
    }, 30000) // 30 seconds debounce
  ).current;

  // Save draft whenever any field changes
  useEffect(() => {
    debouncedSave();
    return () => {
      debouncedSave.cancel();
    };
  }, [to, subject, body, attachments, debouncedSave]);

  // Save immediately on component unmount or window unload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (to || subject || body || attachments.length) {
        saveToDatabase();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Save when component unmounts
      saveToDatabase();
    };
  }, [saveToDatabase, to, subject, body, attachments]);

  // Handle file drops
  const onDrop = (acceptedFiles) => {
    const updatedAttachments = [...attachments, ...acceptedFiles];
    setAttachments(updatedAttachments);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Handle form submission (sending email)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!to) {
      alert("Recipient (To) is required!");
      return;
    }
    console.log("Email Sent:", { to, subject, body, attachments });
    alert("Email sent successfully!");
    // Optionally, delete the draft from the database here
    onClose();
  };

  return (
    <Draggable handle=".handle">
      <div className="fixed top-0 right-0 left-1/2 transform -translate-x-1/2 bg-white shadow-lg w-[90vw] max-w-lg h-auto rounded-lg p-6 overflow-y-auto font-sans">
        {/* Drag Handle */}
        <div className="handle bg-gray-100 p-2 cursor-move rounded-t-lg flex justify-between items-center">
          <h2 className="text-2xl font-bold">Compose Email</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &#10005;
          </button>
        </div>

        {/* Compose Email Content */}
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">To:</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipient email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email subject"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Body:</label>
            <ReactQuill
              ref={quillRef}
              value={body}
              onChange={(value) => setBody(value)}
              placeholder="Write your email here..."
              className="h-40"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Attachments:</label>
            <div
              {...getRootProps({
                className:
                  "dropzone border-2 border-dashed border-blue-500 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50",
              })}
            >
              <input {...getInputProps()} />
              <p>Drag & drop files here, or click to select files</p>
            </div>
            {attachments.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-gray-700">
                {attachments.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </Draggable>
  );
};

export default ComposeEmail;
      