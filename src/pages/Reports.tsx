import { MainLayout, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  BarChart3,
  PieChart,
  FileText,
  Printer,
} from "lucide-react";

const reportCards = [
  {
    title: "Kunlik hisobot",
    description: "Bugungi savdo va buyurtmalar haqida batafsil ma'lumot",
    icon: Calendar,
    color: "from-blue-500 to-blue-600",
    stats: { value: "12,450,000", label: "so'm savdo" },
  },
  {
    title: "Haftalik hisobot",
    description: "So'nggi 7 kun davomidagi moliyaviy ko'rsatkichlar",
    icon: BarChart3,
    color: "from-purple-500 to-purple-600",
    stats: { value: "78,500,000", label: "so'm savdo" },
  },
  {
    title: "Oylik hisobot",
    description: "Oylik daromad, xarajat va foyda tahlili",
    icon: FileText,
    color: "from-green-500 to-green-600",
    stats: { value: "340,000,000", label: "so'm savdo" },
  },
  {
    title: "Mahsulot tahlili",
    description: "Eng ko'p sotilgan va kam sotilgan taomlar",
    icon: PieChart,
    color: "from-orange-500 to-orange-600",
    stats: { value: "48", label: "ta mahsulot" },
  },
];

const quickStats = [
  {
    title: "Bugungi savdo",
    value: "12,450,000",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Buyurtmalar",
    value: "48",
    change: "+8",
    changeType: "positive",
    icon: ShoppingBag,
  },
  {
    title: "Yangi mijozlar",
    value: "12",
    change: "+3",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Eng mashhur taom",
    value: "Osh",
    change: "156 ta",
    changeType: "neutral",
    icon: UtensilsCrossed,
  },
];

const topProducts = [
  { name: "Osh (Palov)", sales: 156, revenue: 5460000 },
  { name: "Shashlik", sales: 124, revenue: 5580000 },
  { name: "Lag'mon", sales: 98, revenue: 2744000 },
  { name: "Manti", sales: 87, revenue: 2175000 },
  { name: "Somsa", sales: 76, revenue: 912000 },
];

const Reports = () => {
  return (
    <MainLayout>
      <Header title="Hisobotlar" subtitle="Biznes tahlili va statistika" />

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-card rounded-xl border border-border/50 p-4 opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.changeType === "positive" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : stat.changeType === "negative" ? (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      ) : null}
                      <span className={
                        stat.changeType === "positive" ? "text-success text-sm" :
                        stat.changeType === "negative" ? "text-destructive text-sm" :
                        "text-muted-foreground text-sm"
                      }>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportCards.map((report, index) => {
            const Icon = report.icon;
            return (
              <Card
                key={report.title}
                className="opacity-0 animate-slide-up hover:shadow-lg transition-all cursor-pointer"
                style={{ animationDelay: `${(index + 4) * 100}ms`, animationFillMode: "forwards" }}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{report.stats.value}</p>
                      <p className="text-sm text-muted-foreground">{report.stats.label}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Printer className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Eng ko'p sotilgan taomlar</CardTitle>
                <CardDescription>So'nggi 30 kun davomida</CardDescription>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Eksport
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} ta sotildi</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{product.revenue.toLocaleString()} so'm</p>
                    <div className="w-24 h-2 bg-muted rounded-full mt-1">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(product.sales / topProducts[0].sales) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Reports;
