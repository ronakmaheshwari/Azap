import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function HdfcNetBanking() {
  const [searchParams] = useSearchParams();  
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
    const [token, setToken] = useState("");
  const [note, setNote] = useState("");

  useEffect(()=>{
    const token = searchParams.get("token");
    setToken(token ?? "");
  },[])

  const handleSubmit = () => { 
    if (!userId || !amount) {
      alert("Please fill in all required fields.");
      return;
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <img
            src="/hdfc.jpg"
            alt="HDFC Bank"
            className="h-10"
          />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
          HDFC NetBanking
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Complete your payment securely
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Customer ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="number"
            placeholder="Amount (INR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            placeholder="Note or Transaction Info (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={3}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Proceed to Pay
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          Do not refresh or press back during the transaction.
        </p>
      </div>
    </div>
  );
}
