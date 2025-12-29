import { useState, useEffect } from "react";
import { MainLayout, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Filter,
  Clock,
  User,
  ChefHat,
  CheckCircle2,
  XCircle,
  Eye,
  Printer,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  waiter: string;
  createdAt: string;
  timeElapsed: string;
  notes?: string;
}

const statusConfig = {
  pending: { label: "Kutilmoqda", icon: Clock, class: "status-pending", color: "bg-warning/15 text-warning" },
  preparing: { label: "Tayyorlanmoqda", icon: ChefHat, class: "status-preparing", color: "bg-info/15 text-info" },
  ready: { label: "Tayyor", icon: CheckCircle2, class: "status-ready", color: "bg-success/15 text-success" },
  completed: { label: "Yakunlandi", icon: CheckCircle2, class: "status-completed", color: "bg-muted text-muted-foreground" },
  cancelled: { label: "Bekor qilindi", icon: XCircle, class: "bg-destructive/15 text-destructive", color: "bg-destructive/15 text-destructive" },
};

const filters = [
  { id: "all", label: "Barchasi" },
  { id: "pending", label: "Kutilmoqda" },
  { id: "preparing", label: "Tayyorlanmoqda" },
  { id: "ready", label: "Tayyor" },
  { id: "completed", label: "Yakunlandi" },
];

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const apiOrders = await api.getOrders();
      const mappedOrders: Order[] = apiOrders.map((o) => ({
        id: `#${o.id}`,
        tableNumber: o.tableId,
        items: o.orderDetails?.map((d) => ({
          name: `Taom ${d.productId}`,
          quantity: d.quantity,
          price: d.price,
        })) || [],
        total: o.totalAmount,
        status: (o.status?.toLowerCase() || 'pending') as Order['status'],
        waiter: o.waiterName || 'Noma\'lum',
        createdAt: new Date(o.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        timeElapsed: getTimeElapsed(o.createdAt),
        notes: o.notes,
      }));
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeElapsed = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} daqiqa`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} soat`;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = activeFilter === "all" || order.status === activeFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.waiter.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <MainLayout>
      <Header title="Buyurtmalar" subtitle="Barcha buyurtmalarni boshqaring" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buyurtma yoki ofitsiant qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Yangi buyurtma
          </Button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Buyurtmalar topilmadi
            </div>
          ) : null}
          {!isLoading && filteredOrders.map((order, index) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            return (
              <div
                key={order.id}
                className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden opacity-0 animate-slide-up hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{order.tableNumber}</span>
                        <span className="text-xs text-muted-foreground">Stol</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg text-foreground">{order.id}</h3>
                          <Badge className={status.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {order.waiter}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {order.createdAt} • {order.timeElapsed}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Summary */}
                    <div className="flex-1 lg:px-6">
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, i) => (
                          <span key={i} className="px-2 py-1 bg-secondary rounded-md text-sm">
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                      </div>
                      {order.notes && (
                        <p className="text-sm text-warning mt-2 italic">📝 {order.notes}</p>
                      )}
                    </div>

                    {/* Total and Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">{order.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">so'm</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Printer className="w-4 h-4" />
                        </Button>
                        {order.status === "ready" && (
                          <Button variant="success" size="sm">
                            Yetkazildi
                          </Button>
                        )}
                        {order.status === "pending" && (
                          <Button variant="default" size="sm">
                            Oshxonaga
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders;
