import { getServerSession } from "next-auth";
import AddMoneyCard from "../../ui/AddMoneyCard";
import BalanceCard from "../../ui/BalanceCard";
import { OnRampTransactions } from "../../ui/RecentTransaction";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: { userId: Number(session?.user?.id) },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const response = await prisma.onRampTransaction.findMany({
    where: { userId: Number(session?.user?.id) },
  });

  return response.map((x) => ({
    status: String(x.status ?? ""),
    time: x.startTime ? new Date(x.startTime) : new Date(0),
    amount: typeof x.amount === "number" ? x.amount : Number(x.amount ?? 0),
    provider: String(x.provider ?? ""),
  }));
}

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-16 py-6 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-[#6a51a6] mb-8">
        Transfer
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <AddMoneyCard />
        </div>
        <div className="w-full space-y-6">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
