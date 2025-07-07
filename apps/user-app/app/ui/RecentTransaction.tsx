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

import MainCard from "@repo/ui/maincard"

enum statusVal {
    Processing,
    Success,
    Failure
}

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <MainCard title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </MainCard>
    }
    return <MainCard title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </MainCard>
}