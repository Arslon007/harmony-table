import { Clock, User, ChefHat, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  table: number;
  items: number;
  total: string;
  status: "pending" | "preparing" | "ready" | "completed";
  time: string;
  waiter: string;
}

const orders: Order[] = [
  { id: "ORD-001", table: 5, items: 4, total: "285,000", status: "preparing", time: "12 daqiqa", waiter: "Sardor" },
  { id: "ORD-002", table: 12, items: 2, total: "145,000", status: "ready", time: "8 daqiqa", waiter: "Dilshod" },
  { id: "ORD-003", table: 3, items: 6, total: "520,000", status: "pending", time: "2 daqiqa", waiter: "Nodira" },
  { id: "ORD-004", table: 8, items: 3, total: "198,000", status: "preparing", time: "15 daqiqa", waiter: "Aziz" },
  { id: "ORD-005", table: 1, items: 5, total: "375,000", status: "completed", time: "25 daqiqa", waiter: "Sardor" },
];

const statusConfig = {
  pending: { label: "Kutilmoqda", icon: Clock, class: "status-pending" },
  preparing: { label: "Tayyorlanmoqda", icon: ChefHat, class: "status-preparing" },
  ready: { label: "Tayyor", icon: CheckCircle2, class: "status-ready" },
  completed: { label: "Yakunlandi", icon: CheckCircle2, class: "status-completed" },
};

export function RecentOrders() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Oxirgi buyurtmalar</h3>
            <p className="text-sm text-muted-foreground">Real vaqtda yangilanadi</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft"></span>
            <span className="text-xs text-muted-foreground">Jonli</span>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {orders.map((order, index) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={order.id}
              className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{order.table}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-3.5 h-3.5" />
                      <span>{order.waiter}</span>
                      <span>•</span>
                      <span>{order.items} ta taom</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{order.total} so'm</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className={cn("status-badge", status.class)}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
