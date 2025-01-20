// src/components/EmailDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import emailData from "./email.json";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaRegStar, FaStar, FaArchive, FaTrash, FaEnvelopeOpen, FaClock } from 'react-icons/fa';
import { deleteEmail, archiveEmail, markAsUnread, snoozeEmail, toggleStarred } from '../slices/EmailSlice';
import { useEffect } from 'react';

const EmailDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // Access the isHovered state from Redux
    const isHovered = useSelector((state) => state.sidebar.isHovered);


    const { archived, deleted, snoozed } = useSelector((state) => state.emails);

    const email = emailData.find((email) => email.id === id); // Find email by ID

    useEffect(() => {
        // Redirect if email is archived, deleted, or snoozed
        if (archived[email.id] || deleted[email.id] || (snoozed[email.id] && snoozed[email.id] > Date.now())) {
            navigate(-1); // Navigate back if email shouldn't be accessible
        }
    }, [archived, deleted, snoozed, email, navigate]);

    if (!email) return <p className="text-center text-gray-500 mt-10">Email not found</p>;

    return (
        <>
            <Navbar />
            <Sidebar
                // Assuming Sidebar is managed globally via Layout or Redux
            />
             <div
            className="bg-gray-50 min-h-screen p-6"
            style={{
                marginTop: "64px",
                paddingLeft: isHovered ? "16rem" : "4rem",
                transition: 'margin-left 0.9s ease', // Adjust based on Redux state
            }}
            // onMouseEnter={() => dispatch(setSidebarHovered(true))} // Dispatch hover action
            // onMouseLeave={() => dispatch(setSidebarHovered(false))} // Dispatch un-hover action
        >
                {/* Back Button */}
                <div className="mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                    >
                        Back
                    </button>
                </div>

                {/* Email Details */}
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">{email.subject}</h2>
                    <div className="text-gray-600">
                        <p>
                            <strong className="text-gray-800">From:</strong> {email.sender}
                        </p>
                        <p>
                            <strong className="text-gray-800">To:</strong> {email.receiver}
                        </p>
                        <p>
                            <strong className="text-gray-800">Date:</strong> {email.date}
                        </p>
                    </div>
                    <div className="text-gray-700 leading-relaxed">{email.body}</div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        {/* Archive */}
                        <button
                            onClick={() => {
                                dispatch(archiveEmail(email.id));
                                navigate(-1);
                            }}
                            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
                        >
                            <FaArchive className="mr-2" /> Archive
                        </button>

                        {/* Delete */}
                        <button
                            onClick={() => {
                                dispatch(deleteEmail(email.id));
                                navigate(-1);
                            }}
                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                        >
                            <FaTrash className="mr-2" /> Delete
                        </button>

                        {/* Mark as Unread */}
                        <button
                            onClick={() => dispatch(markAsUnread(email.id))}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                        >
                            <FaEnvelopeOpen className="mr-2" /> Mark as Unread
                        </button>

                        {/* Snooze */}
                        <button
                            onClick={() => {
                                const snoozeTime = Date.now() + 3600000; // Snooze for 1 hour
                                dispatch(snoozeEmail({ emailId: email.id, snoozeUntil: snoozeTime }));
                                navigate(-1);
                            }}
                            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-all"
                        >
                            <FaClock className="mr-2" /> Snooze
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailDetail;
