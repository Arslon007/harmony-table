import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "08:00", sales: 450000 },
  { time: "09:00", sales: 820000 },
  { time: "10:00", sales: 1200000 },
  { time: "11:00", sales: 1850000 },
  { time: "12:00", sales: 3200000 },
  { time: "13:00", sales: 4100000 },
  { time: "14:00", sales: 3500000 },
  { time: "15:00", sales: 2800000 },
  { time: "16:00", sales: 2200000 },
  { time: "17:00", sales: 2600000 },
  { time: "18:00", sales: 3800000 },
  { time: "19:00", sales: 4500000 },
  { time: "20:00", sales: 5200000 },
  { time: "21:00", sales: 4800000 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  return `${(value / 1000).toFixed(0)}K`;
};

export function SalesChart() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Bugungi savdo</h3>
        <p className="text-sm text-muted-foreground">Soatlik savdo dinamikasi</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 90%)" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(20, 10%, 45%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(20, 10%, 45%)", fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(30, 15%, 90%)",
                borderRadius: "12px",
                boxShadow: "0 4px 16px -4px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number) => [`${value.toLocaleString()} so'm`, "Savdo"]}
              labelStyle={{ color: "hsl(20, 20%, 12%)", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(25, 95%, 53%)"
              strokeWidth={2.5}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
