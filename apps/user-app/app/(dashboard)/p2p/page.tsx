import { getServerSession } from "next-auth";
import ReceivedOffRamp from "../../lib/action/ReceivedOffRamp";
import SentOffRamp from "../../lib/action/SentOffRamp";
import SendCard from "../../ui/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import TransactionCard from "../../ui/TransactionCard";

export default async function() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) return <div>You must be signed in</div>;
  const [sentTxns, receivedTxns] = await Promise.all([
    prisma.offRampTransaction.findMany({
      where: { senderId: userId },
      include: { receiver: true }
    }),
    prisma.offRampTransaction.findMany({
      where: { receiverId: userId },
      include: { sender: true }
    }),
  ]);

    return(
        <div className="w-full h-full px-4 md:px-8 lg:px-16 py-6 bg-gray-50">
              <h1 className="text-3xl md:text-4xl font-bold text-[#6a51a6] mb-8">
                P2P Transactions
              </h1>
              <div className="flex h-full justify-center items-start gap-5">
                <div className="w-[50%]">
                  <SendCard />
                </div>
                <div className="flex flex-col gap-4 border p-6 rounded-lg shadow-sm bg-white w-[50%] ">
                  <h2 className="text-xl font-semibold text-gray-800">Your Transactions</h2>
                  <div className="flex flex-col gap-3 max-h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
                    {sentTxns.map((txn) => (
                      <TransactionCard
                        key={typeof txn.id === "number" ? txn.id : 0}
                        name={typeof txn.receiver.name === "string" ? txn.receiver.name : String(txn.receiver.name) || "Unknown"}
                        amount={typeof txn.amount === "number" ? txn.amount/100 : 0}
                        time={txn.startTime instanceof Date ? txn.startTime : new Date()}
                        isSent={true}
                      />
                    ))}

                    {receivedTxns.map((txn) => (
                      <TransactionCard
                        key={typeof txn.id === "number" ? txn.id : 0}
                        name={typeof txn.sender.name === "string" ? txn.sender.name : String(txn.sender.name) || "Unknown"}
                        amount={typeof txn.amount === "number" ? txn.amount/100 : 0}
                        time={txn.startTime instanceof Date ? txn.startTime : new Date()}
                        isSent={false}
                      />
                    ))}
                    </div>

                </div>
              </div>
            </div>
    )
}