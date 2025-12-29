import { useState } from "react";
import { MainLayout, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Phone,
  Calendar,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Gift,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Customer {
  id: string;
  name: string;
  phone: string;
  visits: number;
  totalSpent: number;
  lastVisit: string;
  loyaltyPoints: number;
  status: "vip" | "regular" | "new";
}

const customers: Customer[] = [
  {
    id: "1",
    name: "Alisher Usmanov",
    phone: "+998 90 111 22 33",
    visits: 45,
    totalSpent: 12500000,
    lastVisit: "2024-01-20",
    loyaltyPoints: 1250,
    status: "vip",
  },
  {
    id: "2",
    name: "Gulnora Karimova",
    phone: "+998 91 222 33 44",
    visits: 28,
    totalSpent: 7800000,
    lastVisit: "2024-01-19",
    loyaltyPoints: 780,
    status: "vip",
  },
  {
    id: "3",
    name: "Bobur Toshmatov",
    phone: "+998 93 333 44 55",
    visits: 12,
    totalSpent: 2400000,
    lastVisit: "2024-01-18",
    loyaltyPoints: 240,
    status: "regular",
  },
  {
    id: "4",
    name: "Sevara Nazarova",
    phone: "+998 94 444 55 66",
    visits: 8,
    totalSpent: 1600000,
    lastVisit: "2024-01-15",
    loyaltyPoints: 160,
    status: "regular",
  },
  {
    id: "5",
    name: "Jasur Ergashev",
    phone: "+998 95 555 66 77",
    visits: 2,
    totalSpent: 350000,
    lastVisit: "2024-01-20",
    loyaltyPoints: 35,
    status: "new",
  },
  {
    id: "6",
    name: "Malika Yusupova",
    phone: "+998 97 666 77 88",
    visits: 1,
    totalSpent: 180000,
    lastVisit: "2024-01-21",
    loyaltyPoints: 18,
    status: "new",
  },
];

const statusConfig = {
  vip: { label: "VIP", color: "bg-yellow-500/15 text-yellow-600" },
  regular: { label: "Doimiy", color: "bg-blue-500/15 text-blue-500" },
  new: { label: "Yangi", color: "bg-green-500/15 text-green-500" },
};

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(c => c.status === "vip").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpent = totalRevenue / totalCustomers;

  return (
    <MainLayout>
      <Header title="Mijozlar" subtitle="Mijozlar bazasini boshqaring" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Mijoz qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Yangi mijoz
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <p className="text-sm text-muted-foreground">Jami mijozlar</p>
            <p className="text-2xl font-bold">{totalCustomers}</p>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <p className="text-sm text-muted-foreground">VIP mijozlar</p>
            <p className="text-2xl font-bold text-yellow-600">{vipCustomers}</p>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <p className="text-sm text-muted-foreground">Jami daromad</p>
            <p className="text-2xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <p className="text-sm text-muted-foreground">O'rtacha xarajat</p>
            <p className="text-2xl font-bold">{(avgSpent / 1000).toFixed(0)}K</p>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Mijoz</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Telefon</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Tashriflar</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Jami xarajat</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Ball</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Oxirgi tashrif</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => {
                  const status = statusConfig[customer.status];
                  return (
                    <tr
                      key={customer.id}
                      className="border-t border-border/50 hover:bg-muted/30 transition-colors opacity-0 animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                            {customer.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="font-medium">{customer.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          {customer.visits}
                        </div>
                      </td>
                      <td className="p-4 font-medium">
                        {customer.totalSpent.toLocaleString()} so'm
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {customer.loyaltyPoints}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {customer.lastVisit}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={status.color}>{status.label}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Tahrirlash
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Gift className="w-4 h-4 mr-2" />
                              Ball qo'shish
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              O'chirish
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Customers;
