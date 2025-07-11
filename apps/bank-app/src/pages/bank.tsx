import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

type ProviderType = "HDFC" | "YESBANK" | "AXISBANK" | "ICIC" | "BOB" | "UPI";

const providerWebhookMap: Record<ProviderType, string> = {
  HDFC: "http://localhost:3002/hdfc",
  YESBANK: "http://localhost:3002/yesbank",
  AXISBANK: "http://localhost:3002/axisbank",
  ICIC: "http://localhost:3002/icic",
  BOB: "http://localhost:3002/bob",
  UPI: "https://webhook.site/upi",
};

const providerImage: Record<ProviderType, string> = {
  HDFC: "/hdfcbank.png",
  YESBANK: "/yesbank.png",
  AXISBANK: "/axisbank.png",
  ICIC: "/icicbank.png",
  BOB: "/bob.png",
  UPI: "/upi.png",
};

export default function Bank() {
  const { provider } = useParams<{ provider: string }>();
  const [searchParams] = useSearchParams();

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  
  const providerKey = provider?.toUpperCase() as ProviderType;
  const imageSrc = provider ? providerImage[providerKey] : "";

  useEffect(() => {
    const amt = searchParams.get("amount");
    const tkn = searchParams.get("token");
    const amount = ((Number(amt))/100).toString()
    
    if (amt) setAmount(amount);
    if (tkn) setToken(tkn);
  }, [searchParams]);

  const handleConfirm = async () => {
    if (!provider || !amount || !token) return;

    const providerKey = provider.toUpperCase() as ProviderType;
    const webhookURL = providerWebhookMap[providerKey];
    
    if (!webhookURL) {
      alert("Invalid provider");
      return;
    }

    setStatus("sending");

    try {
      const response = await axios.post(webhookURL, {
        // provider: providerKey,
        // amount,
        token
        // timestamp: new Date().toISOString(),
      });
      setStatus("success");

      if(response.status == 200){
        setTimeout(()=>{
          window.close();
        },5000)
      }

    } catch (error) {
      console.error("Webhook error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          {imageSrc && (
            <img src={imageSrc} alt={`${providerKey} logo`} className="h-12 mx-auto mb-2" />
          )}
          <h2 className="text-xl font-bold text-gray-800">
            {providerKey} NetBanking
          </h2>
          <p className="text-sm text-gray-500">Confirm your transaction</p>
        </div>

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium text-gray-900">₹ {amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Token:</span>
            <span className="font-mono text-gray-700 text-xs">{token}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Provider:</span>
            <span className="text-gray-900">{provider?.toUpperCase()}</span>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={status === "sending"}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {status === "sending"
            ? "Processing..."
            : status === "success"
            ? "✅ Success!"
            : status === "error"
            ? "❌ Failed. Try Again"
            : "Confirm & Pay"}
        </button>

        <p className="text-xs text-center text-gray-400">
          Do not refresh the page while transaction is processing.
        </p>
      </div>
    </div>
  );
}
