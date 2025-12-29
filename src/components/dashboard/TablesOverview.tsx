import { cn } from "@/lib/utils";

interface Table {
  id: number;
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "billing";
}

const tables: Table[] = [
  { id: 1, number: 1, capacity: 4, status: "occupied" },
  { id: 2, number: 2, capacity: 2, status: "available" },
  { id: 3, number: 3, capacity: 6, status: "billing" },
  { id: 4, number: 4, capacity: 4, status: "occupied" },
  { id: 5, number: 5, capacity: 8, status: "reserved" },
  { id: 6, number: 6, capacity: 4, status: "available" },
  { id: 7, number: 7, capacity: 2, status: "occupied" },
  { id: 8, number: 8, capacity: 4, status: "available" },
];

const statusConfig = {
  available: { label: "Bo'sh", color: "bg-success" },
  occupied: { label: "Band", color: "bg-primary" },
  reserved: { label: "Bron", color: "bg-warning" },
  billing: { label: "Hisob", color: "bg-info" },
};

export function TablesOverview() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Stollar holati</h3>
          <p className="text-sm text-muted-foreground">Hozirgi vaqt holati</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {Object.entries(statusConfig).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={cn("w-2.5 h-2.5 rounded-full", value.color)}></span>
              <span className="text-muted-foreground">{value.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {tables.map((table, index) => {
          const status = statusConfig[table.status];
          return (
            <div
              key={table.id}
              className={cn(
                "table-card p-4 opacity-0 animate-scale-in",
                table.status === "available" && "table-available",
                table.status === "occupied" && "table-occupied",
                table.status === "reserved" && "table-reserved",
                table.status === "billing" && "table-billing"
              )}
              style={{ animationDelay: `${index * 50 + 300}ms`, animationFillMode: "forwards" }}
            >
              <span className="text-2xl font-bold">{table.number}</span>
              <span className="text-xs text-muted-foreground">{table.capacity} kishi</span>
              <span className={cn("w-2 h-2 rounded-full absolute top-2 right-2", status.color)}></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
