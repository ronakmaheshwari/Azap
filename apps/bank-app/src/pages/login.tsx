import { useState } from "react";

export default function HdfcLogin() {
  const [userId, setUserId] = useState("");

  const handleSubmit = () => {
    if (!userId.trim()) return alert("Please enter your Customer ID");
    localStorage.setItem("userId", userId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
        <div className="flex items-center justify-center mb-6">
          <img
            src="/hdfc.jpg"
            alt="HDFC Logo"
            className="h-40"
          />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
          Welcome to NetBanking
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Please enter your Customer ID to continue
        </p>

        <input
          type="text"
          placeholder="Customer ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 rounded-md"
        >
          Continue
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Do not share your Customer ID or credentials with anyone.
        </p>
      </div>
    </div>
  );
}
