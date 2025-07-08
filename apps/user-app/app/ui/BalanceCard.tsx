import MainCard from "@repo/ui/maincard";

export default function BalanceCard({amount,locked}:{amount:number,locked:number}){
    return(
        <MainCard title="Balance">
            <div className="flex justify-between border-b border-gray-200 pb-2">
                <div>
                    Unlocked Balance
                </div>
                <div>
                    {amount/100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
                <div>
                    Total Locked Balance
                </div>
                <div>
                    {locked/100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
                <div>
                    Total Balance
                </div>
                <div>
                    {(amount + locked)/100} INR
                </div>
            </div>
        </MainCard>
    )
}