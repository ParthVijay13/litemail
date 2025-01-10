// // import React from 'react';
// import { useSelector } from 'react-redux';
// import emailData from '../src/email.json';

// const Starred = () => {
//     // console.log("running till here");
    
//     const starredEmails = useSelector((state) => state.starred);

//     // Filter the email data to only show starred emails
//     const starredEmailData = emailData.filter((email) => starredEmails[email.id]);
//     // console.log(starredEmailData);
    

//     return (
//         <div className="p-4">
//             <h2 className="text-lg font-semibold mb-4">Starred Emails</h2>
//             {starredEmailData.length > 0 ? (
//                 starredEmailData.map((email, index) => (
//                     <div
//                         key={index}
//                         className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
//                     >
//                         {/* Sender */}
//                         <div className="w-1/4 font-semibold text-gray-800">
//                             {email.sender}
//                         </div>

//                         {/* Subject */}
//                         <div className="w-1/4 text-gray-600">
//                             {email.subject}
//                         </div>

//                         {/* Body Preview */}
//                         <div className="w-1/2 text-gray-500 truncate">
//                             {email.body}
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-gray-500">No starred emails.</p>
//             )}
//         </div>
//     );
// };

// export default Starred;



// src/components/StarredEmails.jsx
import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { toggleStarred } from '../slices/Starredslice';

import Navbar from '../src/Navbar';
import Sidebar from '../src/Sidebar';
import Footer from '../src/Footer';
import emailData from '../src/email.json';
const NavbarHeight = 64; // same as in Inbox
const StarredEmails = () => {
  const starredEmails = useSelector((state) => state.starred); 
  const dispatch = useDispatch();

  // Local states
  const [emails, setEmails] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarHovered, setSidebarHovered] = useState(false);

  // For navigating to detail page
  const navigate = useNavigate();

  // Fetch emails from JSON (same data as Inbox)
//   const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Since the data is already imported, set it directly
    setEmails(emailData);
  }, []);

  // Filter only starred emails
  const starredList = emails.filter((email) => starredEmails[email.id]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleRowClick = (emailId) => {
    // Navigate to the same EmailDetail component, but for starred route
    navigate(`/starred/${emailId}`);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isSidebarHovered={isSidebarHovered}
        setSidebarHovered={setSidebarHovered}
      />

      {/* Main Content */}
      <div
        className="p-4 overflow-hidden"
        style={{
          marginTop: `${NavbarHeight}px`,
          marginLeft: isSidebarHovered ? '16rem' : '4rem',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Starred Emails</h2>
        {starredList.length === 0 ? (
          <p className="text-gray-500">No starred emails.</p>
        ) : (
          starredList.map((email) => (
            <div
              key={email.id}
              onClick={() => handleRowClick(email.id)}
              className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer overflow-hidden"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                className="mr-4"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Star Icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click
                  dispatch(toggleStarred(email.id));
                }}
                className="mr-4 cursor-pointer"
              >
                {/* If it's starred, show filled star; else show outline */}
                {starredEmails[email.id] ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar className="text-gray-400" />
                )}
              </div>

              {/* Sender */}
              <div className="w-1/4 font-semibold text-gray-800">
                {email.sender}
              </div>

              {/* Subject */}
              <div className="w-1/4 text-gray-600">{email.subject}</div>

              {/* Body Preview */}
              <div className="w-1/2 text-gray-500 truncate">
                {email.body}
              </div>
            </div>
          ))
        )}

        {/* Footer */}
        <Footer isSidebarHovered={isSidebarHovered} />
      </div>
    </div>
  );
};

export default StarredEmails;

