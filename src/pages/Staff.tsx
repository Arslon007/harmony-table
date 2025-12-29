import { useState } from "react";
import { MainLayout, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Phone,
  Mail,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  avatar: string;
  hireDate: string;
  salary: number;
}

const staffMembers: Staff[] = [
  {
    id: "1",
    name: "Sardor Aliyev",
    role: "Ofitsiant",
    phone: "+998 90 123 45 67",
    email: "sardor@resto.uz",
    status: "active",
    avatar: "SA",
    hireDate: "2023-01-15",
    salary: 3500000,
  },
  {
    id: "2",
    name: "Dilshod Karimov",
    role: "Oshpaz",
    phone: "+998 91 234 56 78",
    email: "dilshod@resto.uz",
    status: "active",
    avatar: "DK",
    hireDate: "2022-06-20",
    salary: 5000000,
  },
  {
    id: "3",
    name: "Nodira Rahimova",
    role: "Ofitsiant",
    phone: "+998 93 345 67 89",
    email: "nodira@resto.uz",
    status: "active",
    avatar: "NR",
    hireDate: "2023-03-10",
    salary: 3500000,
  },
  {
    id: "4",
    name: "Aziz Yuldashev",
    role: "Bosh oshpaz",
    phone: "+998 94 456 78 90",
    email: "aziz@resto.uz",
    status: "active",
    avatar: "AY",
    hireDate: "2021-09-01",
    salary: 7000000,
  },
  {
    id: "5",
    name: "Malika Tosheva",
    role: "Kassir",
    phone: "+998 95 567 89 01",
    email: "malika@resto.uz",
    status: "inactive",
    avatar: "MT",
    hireDate: "2023-02-28",
    salary: 4000000,
  },
  {
    id: "6",
    name: "Jasur Nazarov",
    role: "Ofitsiant",
    phone: "+998 97 678 90 12",
    email: "jasur@resto.uz",
    status: "active",
    avatar: "JN",
    hireDate: "2023-08-15",
    salary: 3500000,
  },
];

const roleColors: Record<string, string> = {
  "Ofitsiant": "bg-blue-500/15 text-blue-500",
  "Oshpaz": "bg-orange-500/15 text-orange-500",
  "Bosh oshpaz": "bg-purple-500/15 text-purple-500",
  "Kassir": "bg-green-500/15 text-green-500",
};

const Staff = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = staffMembers.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Header title="Xodimlar" subtitle="Barcha xodimlarni boshqaring" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Xodim qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Yangi xodim
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <p className="text-sm text-muted-foreground">Jami xodimlar</p>
            <p className="text-2xl font-bold">{staffMembers.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <p className="text-sm text-muted-foreground">Faol</p>
            <p className="text-2xl font-bold text-success">
              {staffMembers.filter(s => s.status === "active").length}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <p className="text-sm text-muted-foreground">Nofaol</p>
            <p className="text-2xl font-bold text-destructive">
              {staffMembers.filter(s => s.status === "inactive").length}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <p className="text-sm text-muted-foreground">Oylik fond</p>
            <p className="text-2xl font-bold">
              {(staffMembers.reduce((sum, s) => sum + s.salary, 0) / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((staff, index) => (
            <div
              key={staff.id}
              className="bg-card rounded-xl border border-border/50 shadow-card p-6 opacity-0 animate-slide-up hover:shadow-lg transition-all"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {staff.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{staff.name}</h3>
                    <Badge className={roleColors[staff.role] || "bg-gray-500/15 text-gray-500"}>
                      {staff.role}
                    </Badge>
                  </div>
                </div>
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
                      {staff.status === "active" ? (
                        <>
                          <UserX className="w-4 h-4 mr-2" />
                          Nofaol qilish
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Faollashtirish
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      O'chirish
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {staff.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {staff.email}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Oylik</p>
                  <p className="font-semibold">{staff.salary.toLocaleString()} so'm</p>
                </div>
                <Badge variant={staff.status === "active" ? "default" : "secondary"}>
                  {staff.status === "active" ? "Faol" : "Nofaol"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Staff;
