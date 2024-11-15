// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { toggleStarred } from '../slices/Starredslice';
import emailData from './email.json';
import { useState } from 'react';
import Sidebar from './Sidebar';

const Inbox = () => {
    const dispatch = useDispatch();
    const starredEmails = useSelector((state) => state.starred);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    // const [starredEmails, setStarredEmails] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    

    // Toggle star status
    // const toggleStarred = (emailId) => {
    //     setStarredEmails((prevStarred) => ({
    //         ...prevStarred,
    //         [emailId]: !prevStarred[emailId],
    //     }));
    // };


    return (
        <div className="p-4">
            <div className="bg-white p-4 shadow-sm flex justify-between items-center">
                <div className="relative group inline-block">
                    <div
                        className="p-2 rounded-full group-hover:bg-gray-400 transition duration-200 cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Menu
                    </span>
                </div>

                <input
                    type="text"
                    placeholder="Search mail"
                    className="border p-2 rounded-md w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-200">🔔</button>
                    <img
                        src=""
                        alt="User"
                        className="rounded-full w-10 h-10"
                    />
                </div>
            </div>

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  />
            <h2 className="text-lg font-semibold mb-4">Inbox</h2>
            {emailData
                .filter((email) => {
                    const subject = email.subject ? email.subject.toLowerCase() : '';
                    const emailId = email.emailId ? email.emailId.toLowerCase() : '';
                    const term = searchTerm.toLowerCase();
                    return subject.includes(term) || emailId.includes(term);
                }).map((email, index) => (
                <div
                    key={index}  
                    className={`flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${isSidebarOpen ? 'transform translate-x-64 transition-transform' : ''}`}
                >
                    
                    {/* Checkbox */}
                    <input type="checkbox" className="mr-4" />

                    {/* Star Icon */}
                    <div
                        onClick={() => dispatch(toggleStarred(email.emailId))}
                        className="mr-4 cursor-pointer"
                    >
                        {starredEmails[email.emailId] ? (
                            <FaStar className="text-yellow-500" />
                        ) : (
                            <FaRegStar className="text-gray-400" />
                        )}
                    </div>

                    {/* Sender */}
                    <div className="w-1/4 font-semibold text-gray-800">
                        {email.emailId}
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
        </div>
    );
};

export default Inbox;
