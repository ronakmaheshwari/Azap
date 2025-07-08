import { OnRampTransactions } from "../../ui/RecentTransaction";
import SendCard from "../../ui/SendCard";

export default function() {
    return(
        <div className="w-full h-full px-4 md:px-8 lg:px-16 py-6 bg-gray-50">
              <h1 className="text-3xl md:text-4xl font-bold text-[#6a51a6] mb-8">
                P2P Transactions
              </h1>
              <div className="flex w-full h-full justify-center items-start">
                <SendCard />
                {/* <OnRampTransactions /> */}
              </div>
            </div>
    )
}