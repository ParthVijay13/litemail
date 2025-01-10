// src/components/Inbox.jsx
import { useDispatch, useSelector } from 'react-redux';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { toggleStarred } from '../slices/Starredslice';
import { Link } from 'react-router-dom';
import emailData from './email.json';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const NavbarHeight = 64; // Height in pixels (h-16 in Tailwind)

const Inbox = () => {
    const dispatch = useDispatch();
    const starredEmails = useSelector((state) => state.starred);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarHovered, setSidebarHovered] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [emails, setEmails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/email.json')
            .then((response) => response.json())
            .then((data) => setEmails(data));
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const handleRowClick = (emailId) => {
        navigate(`/inbox/${emailId}`);
    };

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
                <h2 className="text-lg font-semibold mb-4">Inbox</h2>
                {emailData
                    .filter((email) => {
                        const subject = email.subject ? email.subject.toLowerCase() : '';
                        const emailId = email.sender ? email.sender.toLowerCase() : '';
                        const term = searchTerm.toLowerCase();
                        return subject.includes(term) || emailId.includes(term);
                    }).map((email, index) => (
                        <div
                            key={index}
                            onClick={() => handleRowClick(email.id)}
                            className={`flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer overflow-hidden`}
                        >
                            {/* Checkbox */}
                            <input type="checkbox" className="mr-4" onClick={(e) => e.stopPropagation()} />

                            {/* Star Icon */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent row click
                                    dispatch(toggleStarred(email.id));
                                }}

                                className="mr-4 cursor-pointer"
                                
                            >
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
                            <div className="w-1/4 text-gray-600">
                                {email.subject}
                            </div>

                            {/* Body Preview */}
                            <div className="w-1/2 text-gray-500 truncate">
                                {email.body}
                            </div>
                        </div>
                    ))}

                {/* Footer */}
                <Footer isSidebarHovered={isSidebarHovered} />
            </div>
        </div>
    );
};

export default Inbox;
