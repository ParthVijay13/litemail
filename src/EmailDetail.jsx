import { useParams, useNavigate } from "react-router-dom";
import emailData from "./email.json";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const EmailDetail = ({isSidebarOpen,toggleSidebar,isSidebarHovered,setSidebarHovered}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  

  const email = emailData.find((email) => email.id === id); // Find email by ID

  if (!email) return <p className="text-center text-gray-500 mt-10">Email not found</p>;

  return (
    <>
    <Navbar/>
    <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isSidebarHovered={isSidebarHovered}
                setSidebarHovered={setSidebarHovered}
            />
    <div className="bg-gray-50 min-h-screen p-6">
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

        {/* Delete Button */}
        <div className="flex justify-end">
          <button
            onClick={() => fetch(`/delete-email/${id}`, { method: "DELETE" })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
          >
            Delete Email
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default EmailDetail;
