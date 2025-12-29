import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Armchair,
  Receipt,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Buyurtmalar", href: "/orders", icon: ClipboardList },
  { name: "Stollar", href: "/tables", icon: Armchair },
  { name: "Menu", href: "/menu", icon: UtensilsCrossed },
  { name: "Xodimlar", href: "/staff", icon: Users },
  { name: "Mijozlar", href: "/customers", icon: UserCircle },
  { name: "Hisob-kitob", href: "/billing", icon: Receipt },
  { name: "Hisobotlar", href: "/reports", icon: BarChart3 },
  { name: "Sozlamalar", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3 overflow-hidden", collapsed && "justify-center")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-glow">
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg text-sidebar-foreground">RestoFlow</h1>
              <p className="text-xs text-sidebar-muted">Boshqaruv tizimi</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "nav-link",
                    isActive && "active",
                    collapsed && "justify-center px-3"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="animate-fade-in">{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Collapse */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Yig''ish</span>
            </>
          )}
        </button>

        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent",
            collapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin</p>
              <p className="text-xs text-sidebar-muted truncate">admin@resto.uz</p>
            </div>
          )}
        </div>

        <NavLink
          to="/login"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm">Chiqish</span>}
        </NavLink>
      </div>
    </aside>
  );
}
