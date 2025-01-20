// src/components/Inbox.jsx
import { useDispatch, useSelector } from 'react-redux';
import { FaRegStar, FaStar, FaArchive, FaTrash, FaEnvelopeOpen, FaClock } from 'react-icons/fa';
import {
  toggleStarred,
  archiveEmail,
  deleteEmail,
  markAsUnread,
  snoozeEmail,
} from '../slices/EmailSlice';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import EmailDetail from './EmailDetail';
import Emaildata from './email.json'
const NavbarHeight = 64; // Height in pixels (h-16 in Tailwind)

const Inbox = () => {
  const dispatch = useDispatch();
  const { starred, archived, deleted, unread, snoozed } = useSelector((state) => state.emails);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarHovered, setSidebarHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();
  const isHovered = useSelector((state) => state.sidebar.isHovered);


  useEffect(() => {
    // Fetch emails from local JSON or API
    // fetch('/email.json')
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => setEmails(data))
    //   .catch((error) => {
    //     console.error('Error fetching emails:', error);
    //   });
    setEmails(Emaildata)
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleRowClick = (emailId) => {
    navigate(`/inbox/${emailId}`);
  };

  // Filter out archived and deleted emails, and exclude snoozed emails until their snooze time
  const filteredEmails = emails.filter(
    (email) =>
      !archived[email.id] &&
      !deleted[email.id] &&
      !(snoozed[email.id] && snoozed[email.id] > Date.now())
  );

  // Apply search filter based on subject or sender
  const displayedEmails = filteredEmails.filter((email) => {
    const subject = email.subject ? email.subject.toLowerCase() : '';
    const sender = email.sender ? email.sender.toLowerCase() : '';
    const term = searchTerm.toLowerCase();
    return subject.includes(term) || sender.includes(term);
  });

  // Handle Snooze functionality: periodically check if snoozed emails should be un-snoozed and optionally archived
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      Object.keys(snoozed).forEach((emailId) => {
        if (snoozed[emailId] && snoozed[emailId] <= now) {
          dispatch(snoozeEmail({ emailId, snoozeUntil: null })); // Remove snooze
          dispatch(archiveEmail(emailId)); // Optionally archive
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [snoozed, dispatch]);

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSidebarHovered={isSidebarHovered} // Pass hover state
      />

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
          marginTop: `${NavbarHeight}px`, // Offset for fixed Navbar
          marginLeft: isHovered ? '16rem' : '4rem', // Offset based on Sidebar width
          transition: 'margin-left 0.3s ease',
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Inbox</h2>
        {displayedEmails.length === 0 ? (
          <p className="text-gray-500">No emails found.</p>
        ) : (
          displayedEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => handleRowClick(email.id)}
              className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer relative group`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                className="mr-4 w-4 h-4 flex-shrink-0"
                onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
              />

              {/* Star Icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click when clicking star
                  dispatch(toggleStarred(email.id));
                }}
                className="mr-4 w-6 h-6 flex-shrink-0 cursor-pointer"
              >
                {starred[email.id] ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar className="text-gray-400" />
                )}
              </div>

              {/* Sender */}
              <div className="w-1/4 flex-shrink-0 font-semibold text-gray-800">
                {email.sender}
              </div>

              {/* Subject */}
              <div className="w-1/4 flex-shrink-0 text-gray-600">
                {email.subject}
              </div>

              {/* Body Text with Truncation */}
              <div className="flex-grow truncate ">
                <span className="text-gray-500">{email.body}</span>
              </div>

              {/* Action Buttons - Visible on Hover */}
              <div
                className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2"
                onClick={(e) => e.stopPropagation()} // Prevent row click when clicking action buttons
              >
                {/* Archive */}
                <button
                  onClick={() => dispatch(archiveEmail(email.id))}
                  className="text-gray-500 hover:text-blue-500"
                  title="Archive"
                  aria-label="Archive Email"
                >
                  <FaArchive />
                </button>

                {/* Delete */}
                <button
                  onClick={() => dispatch(deleteEmail(email.id))}
                  className="text-gray-500 hover:text-red-500"
                  title="Delete"
                  aria-label="Delete Email"
                >
                  <FaTrash />
                </button>

                {/* Mark as Unread */}
                <button
                  onClick={() => dispatch(markAsUnread(email.id))}
                  className="text-gray-500 hover:text-green-500"
                  title="Mark as Unread"
                  aria-label="Mark Email as Unread"
                >
                  <FaEnvelopeOpen />
                </button>

                {/* Snooze */}
                <button
                  onClick={() =>
                    dispatch(
                      snoozeEmail({
                        emailId: email.id,
                        snoozeUntil: Date.now() + 3600000, // Snooze for 1 hour
                      })
                    )
                  }
                  className="text-gray-500 hover:text-purple-500"
                  title="Snooze"
                  aria-label="Snooze Email"
                >
                  <FaClock />
                </button>
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

export default Inbox;
