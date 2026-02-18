import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Star,
  Calendar,
  Image,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit2,
  Trash2,
  MoreVertical,
  ChefHat,
  Wine,
  Coffee,
  IceCream,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import type { MenuCategory } from '@/types';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin' },
  { id: 'menu', label: 'Gestion du Menu', icon: UtensilsCrossed, href: '/admin/menu' },
  { id: 'reviews', label: 'Avis Clients', icon: Star, href: '/admin/reviews' },
  { id: 'reservations', label: 'Réservations', icon: Calendar, href: '/admin/reservations' },
  { id: 'gallery', label: 'Galerie Médias', icon: Image, href: '/admin/gallery' },
  { id: 'settings', label: 'Paramètres', icon: Settings, href: '/admin/settings' },
];

const categories = [
  { value: 'starters', label: 'Entrées', icon: UtensilsCrossed },
  { value: 'mains', label: 'Plats Principaux', icon: ChefHat },
  { value: 'desserts', label: 'Desserts', icon: IceCream },
  { value: 'drinks', label: 'Boissons', icon: Coffee },
  { value: 'wines', label: 'Vins', icon: Wine },
];

// Sample menu items
const sampleMenuItems = [
  {
    id: '1',
    name: 'Viande Mouton Fris',
    description: 'Viande de mouton frite accompagnée de riz et sauce aux légumes frais',
    price: 8500,
    category: 'mains',
    is_available: true,
  },
  {
    id: '2',
    name: 'Brochette de Gésiers',
    description: 'Brochette de gésiers marinés et grillés aux épices africaines',
    price: 4500,
    category: 'starters',
    is_available: true,
  },
  {
    id: '3',
    name: 'Sauté de Fromage Warangachi',
    description: 'Fromage local warangachi sauté aux fines herbes et épices',
    price: 5500,
    category: 'starters',
    is_available: true,
  },
];

const AdminMenu = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('menu');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<typeof sampleMenuItems[0] | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'mains' as MenuCategory,
    is_available: true,
    image: null as File | null,
    video: null as File | null,
  });

  const filteredItems = sampleMenuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/admin/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingItem ? 'Plat modifié avec succès' : 'Plat ajouté avec succès');
    setIsAddDialogOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'mains',
      is_available: true,
      image: null,
      video: null,
    });
  };

  const handleEdit = (item: typeof sampleMenuItems[0]) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category as MenuCategory,
      is_available: item.is_available,
      image: null,
      video: null,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (_id: string) => {
    toast.success('Plat supprimé avec succès');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-serif font-bold text-white">
            <span className="italic text-amber-500">La</span> Réserve
          </h1>
          <p className="text-slate-500 text-sm">Panel Admin</p>
        </div>

        <nav className="px-4 pb-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    navigate(item.href);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeItem === item.id
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Gestion du Menu</h2>
              <p className="text-slate-400">Gérez vos plats, prix et disponibilités</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un plat
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg bg-slate-950 border-slate-800 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white text-2xl">
                    {editingItem ? 'Modifier le plat' : 'Ajouter un plat'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <Label className="text-slate-300">Nom du plat *</Label>
                    <Input
                      required
                      placeholder="Ex: Viande Mouton Fris"
                      className="bg-slate-900 border-slate-700 text-white mt-1"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Description</Label>
                    <Textarea
                      placeholder="Description du plat..."
                      className="bg-slate-900 border-slate-700 text-white mt-1"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Prix (FCFA) *</Label>
                      <Input
                        type="number"
                        required
                        placeholder="8500"
                        className="bg-slate-900 border-slate-700 text-white mt-1"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Catégorie *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value as MenuCategory })}
                      >
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700">
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value} className="text-white">
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-300">Image du plat</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="bg-slate-900 border-slate-700 text-white mt-1"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                    />
                    <p className="text-slate-500 text-xs mt-1">
                      Formats acceptés: JPG, PNG, WebP. Max 5MB.
                    </p>
                  </div>

                  <div>
                    <Label className="text-slate-300">Vidéo (optionnel)</Label>
                    <Input
                      type="file"
                      accept="video/*"
                      className="bg-slate-900 border-slate-700 text-white mt-1"
                      onChange={(e) => setFormData({ ...formData, video: e.target.files?.[0] || null })}
                    />
                    <p className="text-slate-500 text-xs mt-1">
                      Formats acceptés: MP4, WebM. Max 50MB.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={formData.is_available}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                    />
                    <Label className="text-slate-300">Disponible</Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
                  >
                    {editingItem ? 'Modifier' : 'Ajouter'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                placeholder="Rechercher un plat..."
                className="pl-10 bg-slate-900 border-slate-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all" className="text-white">Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="text-white">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Menu Items Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-slate-900 border-slate-800 overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                    <UtensilsCrossed className="w-12 h-12 text-slate-600" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2 mt-1">{item.description}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-400">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-900 border-slate-800">
                          <DropdownMenuItem
                            onClick={() => handleEdit(item)}
                            className="text-white hover:bg-slate-800 cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-amber-500 font-bold">{formatPrice(item.price)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.is_available
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {item.is_available ? 'Disponible' : 'Indisponible'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMenu;
