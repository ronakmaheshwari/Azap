"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"



interface ChartSchema {
  _count: {
    provider: number
  }
  provider: string
}

export const fintechColors = [
  "#635BFF", // Stripe Blue (primary)
  "#00C896", // Wise Green
  "#0052CC", // Corporate Blue
  "#FFA400", // Vibrant Orange
  "#FF5A5F", // Coral Red
  "#2D3748", // Deep Gray
  "#CBD5E0", // Light Gray
];


export default function PieCharts({data}:{data:ChartSchema[]}){
    const formatedData = data.map((x)=>({
        name:x.provider,
        value:x._count.provider
    }))
    return(
        <ResponsiveContainer width="100%" height={200}>
        <PieChart>
            <Pie
            data={formatedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            label
            >
            {formatedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={fintechColors[index % fintechColors.length]} />
            ))}
            </Pie>
            <Tooltip />
        </PieChart>
        </ResponsiveContainer>
    )
}