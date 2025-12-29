import { TrendingUp, Flame } from "lucide-react";

interface PopularItem {
  id: number;
  name: string;
  category: string;
  orders: number;
  revenue: string;
  trend: number;
}

const popularItems: PopularItem[] = [
  { id: 1, name: "Osh (Palov)", category: "Asosiy taom", orders: 156, revenue: "4,680,000", trend: 12 },
  { id: 2, name: "Kabob", category: "Go'sht", orders: 124, revenue: "3,720,000", trend: 8 },
  { id: 3, name: "Shashlik", category: "Go'sht", orders: 98, revenue: "2,940,000", trend: 15 },
  { id: 4, name: "Manti", category: "Milliy", orders: 87, revenue: "1,740,000", trend: -3 },
  { id: 5, name: "Lag'mon", category: "Suyuq taom", orders: 76, revenue: "1,520,000", trend: 5 },
];

export function PopularItems() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Mashhur taomlar</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Bugungi eng ko'p buyurtma qilingan</p>
      </div>
      <div className="divide-y divide-border">
        {popularItems.map((item, index) => (
          <div
            key={item.id}
            className="p-4 hover:bg-secondary/30 transition-colors opacity-0 animate-slide-up"
            style={{ animationDelay: `${index * 100 + 200}ms`, animationFillMode: "forwards" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">#{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{item.orders} ta</p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <TrendingUp
                    className={`w-3.5 h-3.5 ${item.trend >= 0 ? "text-success" : "text-destructive rotate-180"}`}
                  />
                  <span className={`text-xs font-medium ${item.trend >= 0 ? "text-success" : "text-destructive"}`}>
                    {item.trend >= 0 ? "+" : ""}{item.trend}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
