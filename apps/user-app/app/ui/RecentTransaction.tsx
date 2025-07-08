// import prisma from "@repo/db/client";
// import MainCard from "@repo/ui/maincard";

// export async function GetSession() {
//     try {
//         const response  = await fetch("http://localhost:3001/api/user")
//         if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const userId = response.json()
//         return userId
//     } catch (error) {
//         console.error("Failed to fetch session:", error);
//         return null;
//     }
// }

// export async function TransactionData(userId:number) {
//     const response = await prisma.onRampTransaction.findMany({
//         where:{
//             userId:userId
//         }
//     })
//     return response
// }

// export default async function RecentTransaction(){
//     const data = await GetSession();
//     const userId = Number(data?.id);
//     const result = await TransactionData(userId);
//     return(
//         <MainCard title="Recent Transaction">
//                 {result.length === 0 ? (
//                     <div className="text-center pb-8 pt-8">No Recent Transaction</div>
//                 ) : (
//                     <div className="pt-2">
//                         {result.map((x, idx) => (
//                             <div key={idx} className="flex justify-between">
//                                <div>
//                                     <div className="text-sm">
//                                         Received INR
//                                     </div>
//                                     <div className="text-slate-600 text-xs">
//                                         {x.time ? new Date(x.time).toDateString() : ""}
//                                     </div>
//                                </div>
//                                <div className="flex flex-col justify-center">
//                                       + Rs {(typeof x.amount === "number" ? x.amount : 0) / 100}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//         </MainCard>
//     )
// }

import MainCard from "@repo/ui/maincard";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <MainCard title="Recent Transactions">
        <div className="text-center text-gray-500 pb-8 pt-8">
          No Recent Transactions
        </div>
      </MainCard>
    );
  }

  return (
    <MainCard title="Recent Transactions">
      <div className="pt-2 space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {transactions.map((t, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-3"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                Received INR
              </span>
              <div className="flex items-center text-xs text-gray-500 gap-2 mt-1">
                <StatusBadge status={t.status} />
                <span>{t.time.toDateString()}</span>
                <ProviderBadge provider={t.provider} />
              </div>
            </div>
            <div className="text-green-600 text-base font-semibold">
              + ₹{(t.amount / 100).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </MainCard>
  );
};

function StatusBadge({ status }: { status: string }) {
  const base = "px-2 py-0.5 rounded-full text-xs font-semibold";
  switch (status.toLowerCase()) {
    case "success":
      return <span className={`${base} bg-green-100 text-green-700`}>Success</span>;
    case "processing":
      return <span className={`${base} bg-yellow-100 text-yellow-700`}>Processing</span>;
    case "failure":
      return <span className={`${base} bg-red-100 text-red-700`}>Failed</span>;
    default:
      return <span className={`${base} bg-gray-200 text-gray-600`}>{status}</span>;
  }
}

type ProviderType = "HDFC" | "YesBank" | "AxisBank" | "ICIC" | "BOB" | "UPI";

function ProviderBadge({provider}:{provider:string}){
    const base = "p-1 rounded-md text-xs font-semibold"
    switch(provider.toLowerCase()){
        case "hdfc":
            return <span className={`${base} bg-slate-50 text-gray-400`}>HDFC</span>
        case "yesbank":
            return <span className={`${base} bg-slate-50 text-gray-400`}>YesBank</span>
        case "axisbank":
            return <span className={`${base} bg-slate-50 text-gray-400`}>AxisBank</span>
        case "icic":
            return <span className={`${base} bg-slate-50 text-gray-400`}>ICIC</span>
        case "bob":
            return <span className={`${base} bg-slate-50 text-gray-400`}>BOB</span>
        case "upi":
            return <span className={`${base} bg-slate-50 text-gray-400`}>UPI</span>
    }
}