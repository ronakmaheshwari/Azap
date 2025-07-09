"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FC } from "react";

interface TransactionCardProps {
  key:number
  amount: number;
  name: string;
  time: Date;
  isSent: boolean;
}

const TransactionCard: FC<TransactionCardProps> = ({ key,amount, name, time, isSent }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm bg-white hover:shadow-md transition duration-200 ">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full ${
            isSent ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {isSent ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {isSent ? `Sent to` : `Received from`} {name}
          </span>
          <span className="text-xs text-gray-500">{new Date(time).toLocaleString()}</span>
        </div>
      </div>

      <div
        className={`text-lg font-semibold ${
          isSent ? "text-red-600" : "text-green-600"
        }`}
      >
        {isSent ? `- ₹${amount}` : `+ ₹${amount}`}
      </div>
    </div>
  );
};

export default TransactionCard;
