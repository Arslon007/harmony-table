import { useState, useEffect } from "react";
import { MainLayout, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Search,
  Plus,
  Filter,
  Grid3X3,
  List,
  Edit2,
  Trash2,
  Star,

} from "lucide-react";
import { cn } from "@/lib/utils";
import api, { Product, Category, CreateProductDTO } from "@/lib/api";

interface MenuItem {
  id: number;
  name: string;
  categoryId: number;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  popular: boolean;
}

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<CreateProductDTO>({
    name: "",
    description: "",
    basePrice: 0,
    categoryId: 0,
    imageUrl: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Load categories first to debug
      let cats: Category[] = [];
      try {
        const catsResponse = await api.getCategories();
        console.log('Categories API response:', catsResponse);
        cats = Array.isArray(catsResponse) ? catsResponse : [];
      } catch (catError) {
        console.error('Failed to load categories:', catError);
      }

      const products = await api.getProducts();
      console.log('Loaded categories:', cats);
      setCategories(cats);

      const mappedItems: MenuItem[] = products.map((p) => {
        const category = cats.find(c => c.id === p.categoryId);
        return {
          id: p.id,
          name: p.name,
          categoryId: p.categoryId,
          category: category?.name || "Boshqa",
          price: p.basePrice,
          description: p.description || "",
          image: p.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          inStock: p.available !== false,
          popular: false,
        };
      });
      setMenuItems(mappedItems);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.categoryId) {
        alert("Iltimos barcha maydonlarni to'ldiring");
        return;
      }
      setIsLoading(true);
      await api.createProduct(newProduct);
      await loadData();
      setIsCreateDialogOpen(false);
      setNewProduct({ name: "", description: "", basePrice: 0, categoryId: 0, imageUrl: "" });
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Taom yaratishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (item: MenuItem) => {
    setEditingProduct({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct || !editingProduct.name || !editingProduct.categoryId) {
      alert("Iltimos barcha maydonlarni to'ldiring");
      return;
    }
    try {
      setIsLoading(true);
      await api.updateProduct(editingProduct.id, {
        name: editingProduct.name,
        description: editingProduct.description,
        basePrice: editingProduct.price,
        categoryId: editingProduct.categoryId,
        imageUrl: editingProduct.image,
      });
      await loadData();
      setIsEditDialogOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Taomni yangilashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Haqiqatan ham bu taomni o'chirmoqchimisiz?")) {
      return;
    }
    try {
      setIsLoading(true);
      await api.deleteProduct(id);
      await loadData();
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      alert(error?.message || "Taomni o'chirishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.categoryId === parseInt(selectedCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <Header title="Menu boshqaruvi" subtitle="Taomlar va kategoriyalarni boshqaring" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Taom qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "grid" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "list" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <Button variant="gradient" className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Yangi taom
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Barchasi
            <span className="ml-2 opacity-70">({menuItems.length})</span>
          </button>
          {categories.map((category) => {
            const count = menuItems.filter(m => m.categoryId === category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(String(category.id))}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  selectedCategory === String(category.id)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category.name}
                <span className="ml-2 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div className={cn(
          "grid gap-4",
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "menu-item-card opacity-0 animate-slide-up",
                viewMode === "list" && "flex flex-row"
              )}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
            >
              <div className={cn(
                "relative overflow-hidden",
                viewMode === "grid" ? "aspect-video" : "w-40 h-32 shrink-0"
              )}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {item.popular && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary text-primary-foreground gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Mashhur
                    </Badge>
                  </div>
                )}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <span className="text-sm font-medium text-destructive">Mavjud emas</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex-1">
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-lg font-bold text-primary">{item.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-1">so'm</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(item)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteProduct(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Product Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Yangi taom qo'shish</DialogTitle>
            <DialogDescription>
              Yangi taom ma'lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nomi
              </Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="col-span-3"
                placeholder="Taom nomini kiriting"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Kategoriya
              </Label>
              <Select
                value={newProduct.categoryId ? String(newProduct.categoryId) : ""}
                onValueChange={(value) => setNewProduct({ ...newProduct, categoryId: parseInt(value) })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Kategoriyani tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      Kategoriyalar mavjud emas
                    </div>
                  ) : (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Narxi (so'm)
              </Label>
              <Input
                id="price"
                type="number"
                value={newProduct.basePrice}
                onChange={(e) => setNewProduct({ ...newProduct, basePrice: parseInt(e.target.value) || 0 })}
                className="col-span-3"
                placeholder="25000"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Tavsif
              </Label>
              <Textarea
                id="description"
                value={newProduct.description || ""}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="col-span-3"
                placeholder="Taom haqida qisqacha ma'lumot"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Rasm URL
              </Label>
              <Input
                id="imageUrl"
                value={newProduct.imageUrl || ""}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                className="col-span-3"
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button variant="gradient" onClick={handleCreateProduct} disabled={isLoading}>
              {isLoading ? "Yaratilmoqda..." : "Yaratish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Taomni tahrirlash</DialogTitle>
            <DialogDescription>
              Taom ma'lumotlarini o'zgartiring
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nomi
                </Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Kategoriya
                </Label>
                <Select
                  value={String(editingProduct.categoryId)}
                  onValueChange={(value) => setEditingProduct({ ...editingProduct, categoryId: parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Kategoriyani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 ? (
                      <div className="p-2 text-sm text-muted-foreground text-center">
                        Kategoriyalar mavjud emas
                      </div>
                    ) : (
                      categories.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Narxi (so'm)
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Tavsif
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Rasm URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button variant="gradient" onClick={handleUpdateProduct} disabled={isLoading}>
              {isLoading ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Menu;
