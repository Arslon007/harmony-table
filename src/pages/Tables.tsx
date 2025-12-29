import { useState, useEffect } from "react";
import { MainLayout, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Users,
  Clock,
  Receipt,
  Merge,
  QrCode,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api, { Table as ApiTable, CreateTableDTO } from "@/lib/api";

interface Table {
  id: number;
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "billing";
  section: string;
  currentOrder?: {
    id: string;
    items: number;
    total: number;
    timeElapsed: string;
    waiter: string;
  };
  reservation?: {
    name: string;
    time: string;
    guests: number;
  };
}

const statusConfig = {
  available: { label: "Bo'sh", color: "bg-success", textColor: "text-success", bgColor: "bg-success/10 border-success/30 hover:border-success" },
  occupied: { label: "Band", color: "bg-primary", textColor: "text-primary", bgColor: "bg-primary/10 border-primary/30 hover:border-primary" },
  reserved: { label: "Bron", color: "bg-warning", textColor: "text-warning", bgColor: "bg-warning/10 border-warning/30 hover:border-warning" },
  billing: { label: "Hisob", color: "bg-info", textColor: "text-info", bgColor: "bg-info/10 border-info/30 hover:border-info" },
};

const sections = ["Barchasi", "Asosiy zal", "VIP", "Teras"];

const Tables = () => {
  const [selectedSection, setSelectedSection] = useState("Barchasi");
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newTable, setNewTable] = useState<CreateTableDTO>({
    tableNumber: 1,
    capacity: 4,
    section: "Asosiy zal",
  });

  useEffect(() => {
    loadTables();
  }, []);

  const normalizeStatus = (status: string): "available" | "occupied" | "reserved" | "billing" => {
    const normalized = String(status).toLowerCase();
    if (normalized === "available" || normalized === "0") return "available";
    if (normalized === "occupied" || normalized === "1") return "occupied";
    if (normalized === "reserved" || normalized === "2") return "reserved";
    if (normalized === "billing" || normalized === "3") return "billing";
    return "available";
  };

  const loadTables = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTables();
      const mappedTables: Table[] = data.map((t) => ({
        id: t.id,
        number: t.tableNumber,
        capacity: t.capacity,
        status: normalizeStatus(t.status as string),
        section: t.section || "Asosiy zal",
      }));
      setTables(mappedTables);
    } catch (error) {
      console.error("Failed to load tables:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTable = async () => {
    try {
      setIsLoading(true);
      await api.createTable(newTable);
      await loadTables();
      setIsCreateDialogOpen(false);
      setNewTable({ tableNumber: tables.length + 1, capacity: 4, section: "Asosiy zal" });
    } catch (error: any) {
      console.error("Failed to create table:", error);
      alert(error?.message || "Stol yaratishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTables = tables.filter((table) =>
    selectedSection === "Barchasi" || table.section === selectedSection
  );

  const stats = {
    total: tables.length,
    available: tables.filter(t => t.status === "available").length,
    occupied: tables.filter(t => t.status === "occupied").length,
    reserved: tables.filter(t => t.status === "reserved").length,
  };

  return (
    <MainLayout>
      <Header title="Stollar" subtitle="Stol holatlarini boshqaring" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border/50 shadow-card p-4">
            <p className="text-sm text-muted-foreground">Jami stollar</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stats.total}</p>
          </div>
          <div className="bg-success/10 rounded-xl border border-success/30 p-4">
            <p className="text-sm text-success">Bo'sh</p>
            <p className="text-3xl font-bold text-success mt-1">{stats.available}</p>
          </div>
          <div className="bg-primary/10 rounded-xl border border-primary/30 p-4">
            <p className="text-sm text-primary">Band</p>
            <p className="text-3xl font-bold text-primary mt-1">{stats.occupied}</p>
          </div>
          <div className="bg-warning/10 rounded-xl border border-warning/30 p-4">
            <p className="text-sm text-warning">Bron qilingan</p>
            <p className="text-3xl font-bold text-warning mt-1">{stats.reserved}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  selectedSection === section
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {section}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Merge className="w-4 h-4" />
              Birlashtirish
            </Button>
            <Button variant="gradient" className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Yangi stol
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {Object.entries(statusConfig).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={cn("w-3 h-3 rounded-full", value.color)}></span>
              <span className="text-muted-foreground">{value.label}</span>
            </div>
          ))}
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredTables.map((table, index) => {
            const status = statusConfig[table.status] || statusConfig.available;
            return (
              <div
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={cn(
                  "relative p-4 rounded-xl border-2 cursor-pointer transition-all opacity-0 animate-scale-in",
                  status.bgColor,
                  selectedTable?.id === table.id && "ring-2 ring-primary ring-offset-2"
                )}
                style={{ animationDelay: `${index * 30}ms`, animationFillMode: "forwards" }}
              >
                {/* Status indicator */}
                <span className={cn("absolute top-2 right-2 w-2.5 h-2.5 rounded-full", status.color)}></span>

                {/* Table number */}
                <div className="text-center mb-3">
                  <span className={cn("text-4xl font-bold", status.textColor)}>{table.number}</span>
                </div>

                {/* Capacity */}
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{table.capacity} kishi</span>
                </div>

                {/* Current order info */}
                {table.currentOrder && (
                  <div className="mt-3 pt-3 border-t border-border/50 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {table.currentOrder.timeElapsed}
                      </span>
                      <span>{table.currentOrder.items} ta</span>
                    </div>
                    <p className={cn("font-semibold mt-1", status.textColor)}>
                      {table.currentOrder.total.toLocaleString()} so'm
                    </p>
                  </div>
                )}

                {/* Reservation info */}
                {table.reservation && (
                  <div className="mt-3 pt-3 border-t border-border/50 text-xs">
                    <p className="font-medium text-foreground">{table.reservation.name}</p>
                    <p className="text-muted-foreground">
                      {table.reservation.time} • {table.reservation.guests} kishi
                    </p>
                  </div>
                )}

                {/* Section badge */}
                <Badge variant="secondary" className="absolute -top-2 left-2 text-xs">
                  {table.section}
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Selected Table Actions */}
        {selectedTable && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-card rounded-2xl shadow-xl border border-border p-4 flex items-center gap-4 animate-slide-up">
              <div className="text-center px-4 border-r border-border">
                <p className="text-sm text-muted-foreground">Stol</p>
                <p className="text-2xl font-bold text-primary">{selectedTable.number}</p>
              </div>
              <div className="flex gap-2">
                {selectedTable.status === "available" && (
                  <Button variant="gradient">Buyurtma olish</Button>
                )}
                {selectedTable.status === "occupied" && (
                  <>
                    <Button variant="outline" className="gap-2">
                      <Receipt className="w-4 h-4" />
                      Hisob
                    </Button>
                    <Button variant="default" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Qo'shish
                    </Button>
                  </>
                )}
                {selectedTable.status === "billing" && (
                  <Button variant="success" className="gap-2">
                    <Receipt className="w-4 h-4" />
                    To'lash
                  </Button>
                )}
                <Button variant="outline" size="icon">
                  <QrCode className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings2 className="w-4 h-4" />
                </Button>
              </div>
              <button
                onClick={() => setSelectedTable(null)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Table Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Yangi stol qo'shish</DialogTitle>
            <DialogDescription>
              Yangi stol ma'lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tableNumber" className="text-right">
                Stol raqami
              </Label>
              <Input
                id="tableNumber"
                type="number"
                value={newTable.tableNumber}
                onChange={(e) => setNewTable({ ...newTable, tableNumber: parseInt(e.target.value) || 1 })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Sig'imi
              </Label>
              <Input
                id="capacity"
                type="number"
                value={newTable.capacity}
                onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) || 1 })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Bo'lim
              </Label>
              <Select
                value={newTable.section}
                onValueChange={(value) => setNewTable({ ...newTable, section: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Bo'limni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asosiy zal">Asosiy zal</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Teras">Teras</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button variant="gradient" onClick={handleCreateTable} disabled={isLoading}>
              {isLoading ? "Yaratilmoqda..." : "Yaratish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Tables;
