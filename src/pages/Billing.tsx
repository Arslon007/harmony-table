import { useState } from "react";
import { MainLayout, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  CreditCard,
  Banknote,
  Wallet,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  paymentMethod: "cash" | "card" | "transfer";
  date: string;
  time: string;
  orderId?: string;
}

const transactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "income",
    category: "Buyurtma",
    description: "Stol #5 - Buyurtma to'lovi",
    amount: 235000,
    paymentMethod: "card",
    date: "2024-01-21",
    time: "13:45",
    orderId: "ORD-001",
  },
  {
    id: "TXN-002",
    type: "income",
    category: "Buyurtma",
    description: "Stol #12 - Buyurtma to'lovi",
    amount: 66000,
    paymentMethod: "cash",
    date: "2024-01-21",
    time: "12:38",
    orderId: "ORD-002",
  },
  {
    id: "TXN-003",
    type: "expense",
    category: "Mahsulot",
    description: "Go'sht va sabzavotlar xaridi",
    amount: 850000,
    paymentMethod: "transfer",
    date: "2024-01-21",
    time: "09:00",
  },
  {
    id: "TXN-004",
    type: "income",
    category: "Buyurtma",
    description: "Stol #3 - Buyurtma to'lovi",
    amount: 156000,
    paymentMethod: "cash",
    date: "2024-01-21",
    time: "13:10",
    orderId: "ORD-003",
  },
  {
    id: "TXN-005",
    type: "expense",
    category: "Oylik",
    description: "Xodimlar oyligi - Yanvar",
    amount: 26500000,
    paymentMethod: "transfer",
    date: "2024-01-20",
    time: "18:00",
  },
  {
    id: "TXN-006",
    type: "expense",
    category: "Kommunal",
    description: "Elektr energiya to'lovi",
    amount: 1200000,
    paymentMethod: "transfer",
    date: "2024-01-19",
    time: "10:30",
  },
  {
    id: "TXN-007",
    type: "income",
    category: "Buyurtma",
    description: "Stol #8 - Buyurtma to'lovi",
    amount: 99000,
    paymentMethod: "card",
    date: "2024-01-21",
    time: "11:45",
    orderId: "ORD-004",
  },
];

const paymentMethodIcons = {
  cash: Banknote,
  card: CreditCard,
  transfer: Wallet,
};

const paymentMethodLabels = {
  cash: "Naqd",
  card: "Karta",
  transfer: "O'tkazma",
};

const filters = [
  { id: "all", label: "Barchasi" },
  { id: "income", label: "Kirim" },
  { id: "expense", label: "Chiqim" },
];

const Billing = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter = activeFilter === "all" || tx.type === activeFilter;
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalIncome = transactions
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <MainLayout>
      <Header title="Hisob-kitob" subtitle="Moliyaviy operatsiyalarni boshqaring" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Jami kirim</p>
                <p className="text-2xl font-bold text-success">{totalIncome.toLocaleString()} so'm</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Jami chiqim</p>
                <p className="text-2xl font-bold text-destructive">{totalExpense.toLocaleString()} so'm</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-destructive/15 flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Balans</p>
                <p className={cn("text-2xl font-bold", balance >= 0 ? "text-success" : "text-destructive")}>
                  {balance.toLocaleString()} so'm
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tranzaksiya qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Eksport
            </Button>
            <Button variant="gradient" className="gap-2">
              <Plus className="w-4 h-4" />
              Yangi tranzaksiya
            </Button>
          </div>
        </div>

        {/* Filters */}
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

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.map((tx, index) => {
            const PaymentIcon = paymentMethodIcons[tx.paymentMethod];
            return (
              <div
                key={tx.id}
                className="bg-card rounded-xl border border-border/50 shadow-card p-4 opacity-0 animate-slide-up hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      tx.type === "income" ? "bg-success/15" : "bg-destructive/15"
                    )}>
                      {tx.type === "income" ? (
                        <ArrowUpRight className="w-6 h-6 text-success" />
                      ) : (
                        <ArrowDownRight className="w-6 h-6 text-destructive" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{tx.description}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{tx.id}</span>
                        <Badge variant="secondary" className="gap-1">
                          <PaymentIcon className="w-3 h-3" />
                          {paymentMethodLabels[tx.paymentMethod]}
                        </Badge>
                        <span>{tx.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={cn(
                        "text-xl font-bold",
                        tx.type === "income" ? "text-success" : "text-destructive"
                      )}>
                        {tx.type === "income" ? "+" : "-"}{tx.amount.toLocaleString()} so'm
                      </p>
                      <p className="text-sm text-muted-foreground">{tx.date} • {tx.time}</p>
                    </div>
                    {tx.orderId && (
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
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

export default Billing;
