"use client";

import { AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";

interface ChartData {
  week: string;
  products: number;
}

export default function ProductsChart({ data }: { data: ChartData[] }) {
  console.log(data);
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray={"3 3"} stroke="#f0f0f0"/>
            <XAxis dataKey={"week"} stroke="#666" fontSize={12} tickLine={false} axisLine={false}/>
          </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}