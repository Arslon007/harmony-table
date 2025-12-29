import { useState } from "react";
import { MainLayout, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Store,
  Bell,
  Palette,
  Shield,
  Printer,
  Globe,
  Save,
  Upload,
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderReady: true,
    lowStock: true,
    dailyReport: false,
  });

  return (
    <MainLayout>
      <Header title="Sozlamalar" subtitle="Tizim sozlamalarini boshqaring" />

      <div className="p-6 space-y-6">
        {/* Restaurant Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Restoran ma'lumotlari</CardTitle>
                <CardDescription>Asosiy ma'lumotlarni tahrirlang</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Restoran nomi</Label>
                <Input id="name" defaultValue="RestoFlow" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon raqam</Label>
                <Input id="phone" defaultValue="+998 71 123 45 67" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="info@restoflow.uz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Manzil</Label>
                <Input id="address" defaultValue="Toshkent sh., Amir Temur ko'chasi, 15" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Logotip</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  RF
                </div>
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Yuklash
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Bildirishnomalar</CardTitle>
                <CardDescription>Bildirishnoma sozlamalarini boshqaring</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Yangi buyurtma</p>
                <p className="text-sm text-muted-foreground">Yangi buyurtma kelganda xabar berish</p>
              </div>
              <Switch
                checked={notifications.newOrder}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newOrder: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Buyurtma tayyor</p>
                <p className="text-sm text-muted-foreground">Oshxonadan buyurtma tayyor bo'lganda</p>
              </div>
              <Switch
                checked={notifications.orderReady}
                onCheckedChange={(checked) => setNotifications({ ...notifications, orderReady: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kam qoldiq</p>
                <p className="text-sm text-muted-foreground">Ombordagi mahsulot kam qolganda</p>
              </div>
              <Switch
                checked={notifications.lowStock}
                onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kunlik hisobot</p>
                <p className="text-sm text-muted-foreground">Har kuni kechqurun hisobot yuborish</p>
              </div>
              <Switch
                checked={notifications.dailyReport}
                onCheckedChange={(checked) => setNotifications({ ...notifications, dailyReport: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Tashqi ko'rinish</CardTitle>
                <CardDescription>Interfeys ko'rinishini sozlang</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Mavzu</Label>
              <div className="flex gap-4">
                <button className="w-20 h-14 rounded-lg bg-white border-2 border-primary flex items-center justify-center">
                  <span className="text-black text-sm">Yorug'</span>
                </button>
                <button className="w-20 h-14 rounded-lg bg-gray-900 border-2 border-border flex items-center justify-center">
                  <span className="text-white text-sm">Qorong'u</span>
                </button>
                <button className="w-20 h-14 rounded-lg bg-gradient-to-r from-white to-gray-900 border-2 border-border flex items-center justify-center">
                  <span className="text-sm">Avto</span>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Asosiy rang</Label>
              <div className="flex gap-3">
                {["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899"].map((color) => (
                  <button
                    key={color}
                    className="w-10 h-10 rounded-full border-2 border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Printer className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Printer sozlamalari</CardTitle>
                  <CardDescription>Chek printeri sozlamalari</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="printer">Printer nomi</Label>
                <Input id="printer" defaultValue="EPSON TM-T20III" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Avtomatik chop etish</p>
                  <p className="text-sm text-muted-foreground">Buyurtma tasdiqlanganda</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Til va mintaqa</CardTitle>
                  <CardDescription>Til va valyuta sozlamalari</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Til</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="uz">O'zbekcha</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Valyuta</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="uzs">UZS - O'zbek so'mi</option>
                  <option value="usd">USD - AQSH dollari</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Xavfsizlik</CardTitle>
                <CardDescription>Parol va xavfsizlik sozlamalari</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Joriy parol</Label>
                <Input id="current-password" type="password" />
              </div>
              <div></div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Yangi parol</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Parolni tasdiqlang</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <Button variant="outline">Parolni o'zgartirish</Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="gradient" className="gap-2">
            <Save className="w-4 h-4" />
            Saqlash
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
