// src/components/StarredEmails.jsx
import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Emaildata from '../src/email.json';
import {
    FaRegStar,
    FaStar,
    FaArchive,
    FaTrash,
    FaEnvelopeOpen,
    FaClock,
} from 'react-icons/fa';
import {
    toggleStarred,
    archiveEmail,
    deleteEmail,
    markAsUnread,
    snoozeEmail,
} from '../slices/EmailSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../src/Navbar';
import Sidebar from '../src/Sidebar';
import Footer from '../src/Footer';

const NavbarHeight = 64; // same as in Inbox

const StarredEmails = () => {
    const dispatch = useDispatch();
    const { starred, archived, deleted, unread, snoozed } = useSelector((state) => state.emails);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarHovered, setSidebarHovered] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [emails, setEmails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch emails from local JSON or API
        setEmails(Emaildata)
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleRowClick = (emailId) => {
        navigate(`/starred/${emailId}`);
    };

    // Filter out archived and deleted emails
    const filteredEmails = emails.filter(
        (email) => starred[email.id] && !archived[email.id] && !deleted[email.id] && !(snoozed[email.id] && snoozed[email.id] > Date.now())
    );

    // Apply search filter
    const displayedEmails = filteredEmails.filter((email) => {
        const subject = email.subject ? email.subject.toLowerCase() : '';
        const sender = email.sender ? email.sender.toLowerCase() : '';
        const term = searchTerm.toLowerCase();
        return subject.includes(term) || sender.includes(term);
    });

    // Handle Snooze functionality (simple example: remove from view after snooze time)
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
                    marginLeft: isSidebarHovered ? '16rem' : '4rem', // Offset based on Sidebar width
                    transition: 'margin-left 0.3s ease',
                }}
            >
                <h2 className="text-lg font-semibold mb-4">Starred Emails</h2>
                {displayedEmails.length === 0 ? (
                    <p className="text-gray-500">No starred emails.</p>
                ) : (
                    displayedEmails.map((email) => (
                        <div
                            key={email.id}
                            onClick={() => handleRowClick(email.id)}
                            className={`flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer overflow-hidden relative group`}
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
                                {starred[email.id] ? (
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
                            <div className="w-1/4 text-gray-600">
                                {email.subject}
                            </div>

                            {/* Body Preview */}
                            <div className="w-1/2 text-gray-500 truncate">
                                {email.body}
                            </div>

                            {/* Action Buttons - Visible on Hover */}
                            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                                {/* Archive */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(archiveEmail(email.id));
                                    }}
                                    className="text-gray-500 hover:text-blue-500"
                                    title="Archive"
                                >
                                    <FaArchive />
                                </button>

                                {/* Delete */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(deleteEmail(email.id));
                                    }}
                                    className="text-gray-500 hover:text-red-500"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>

                                {/* Mark as Unread */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(markAsUnread(email.id));
                                    }}
                                    className="text-gray-500 hover:text-green-500"
                                    title="Mark as Unread"
                                >
                                    <FaEnvelopeOpen />
                                </button>

                                {/* Snooze */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const snoozeTime = Date.now() + 3600000; // Snooze for 1 hour
                                        dispatch(snoozeEmail({ emailId: email.id, snoozeUntil: snoozeTime }));
                                    }}
                                    className="text-gray-500 hover:text-purple-500"
                                    title="Snooze"
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

export default StarredEmails;
