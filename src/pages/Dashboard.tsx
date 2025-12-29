import { MainLayout, Header } from "@/components/layout";
import { StatCard, RecentOrders, SalesChart, PopularItems, TablesOverview } from "@/components/dashboard";
import { DollarSign, ShoppingBag, Users, Armchair, Plus, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <MainLayout>
      <Header 
        title="Dashboard" 
        subtitle="Xush kelibsiz! Bugungi restoran holati" 
      />
      
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link to="/orders/new">
            <Button variant="gradient" className="gap-2">
              <Plus className="w-4 h-4" />
              Yangi buyurtma
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant="outline" className="gap-2">
              <ClipboardList className="w-4 h-4" />
              Barcha buyurtmalar
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Bugungi savdo"
            value="12,450,000 so'm"
            change="+12.5% kechagidan"
            changeType="positive"
            icon={DollarSign}
            delay={0}
          />
          <StatCard
            title="Buyurtmalar"
            value="48"
            change="+8 oxirgi soatda"
            changeType="positive"
            icon={ShoppingBag}
            iconColor="from-accent to-accent/80"
            delay={100}
          />
          <StatCard
            title="Mijozlar"
            value="156"
            change="42 ta hozir restoratda"
            changeType="neutral"
            icon={Users}
            iconColor="from-info to-info/80"
            delay={200}
          />
          <StatCard
            title="Band stollar"
            value="8 / 12"
            change="4 ta bo'sh"
            changeType="neutral"
            icon={Armchair}
            iconColor="from-success to-success/80"
            delay={300}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <TablesOverview />
        </div>

        {/* Orders and Popular Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders />
          <PopularItems />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
