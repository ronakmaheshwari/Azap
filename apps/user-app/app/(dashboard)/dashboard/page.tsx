import CryptoCard from "@repo/ui/cryptobank";
import ChartBalance from "../../lib/action/chartTransaction";
import PieCharts from "../../ui/PieChart";

interface ChartSchema {
  _count: {
    provider: number;
  };
  provider: string;
}

export default async function DashboardPage() {
  const chartsData: ChartSchema[] | { message: string } = await ChartBalance();

  if (!Array.isArray(chartsData)) {
    return <div>Error: {(chartsData as any).message}</div>;
  }

  return (
    <div className="w-full h-full flex flex-col px-4 md:px-8 lg:px-16 py-6 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-[#6a51a6] mb-8">
        Dashboard
      </h1>

      <div className="flex w-full h-full gap-4">
        
        <div className="w-[60%] h-full bg-slate-700 rounded-md shadow-md p-4 text-white">
          <h2 className="text-2xl font-semibold mb-4">Main Dashboard Area</h2>
          <p>This space is for user analytics, recent activity, etc.</p>
        </div>


        <div className="w-[40%] flex flex-col gap-4">
         
          <div className="bg-white rounded-md shadow p-4 flex flex-col items-center justify-center">
            <div className="w-full h-12 flex border-b border-b-gray-200 justify-start items-center p-1">
                <h2 className="text-lg font-semibold">Top Banks</h2>
            </div>
            <div className="w-full h-40 flex items-center justify-center">
                <PieCharts data={chartsData} />
            </div>
          </div>

          <div className="bg-white rounded-md shadow p-4 flex flex-col items-center justify-center gap-3">
            <div className="w-full h-12 flex border-b border-b-gray-200 justify-start items-center p-1">
                <h2 className="text-lg font-semibold">Coming Soon</h2>
            </div>
            <CryptoCard />
          </div>
        </div>
      </div>
    </div>
  );
}
