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
  Trash2,
  Star as StarIcon,
  Image as ImageIcon,
  Video,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
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

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin' },
  { id: 'menu', label: 'Gestion du Menu', icon: UtensilsCrossed, href: '/admin/menu' },
  { id: 'reviews', label: 'Avis Clients', icon: Star, href: '/admin/reviews' },
  { id: 'reservations', label: 'Réservations', icon: Calendar, href: '/admin/reservations' },
  { id: 'gallery', label: 'Galerie Médias', icon: Image, href: '/admin/gallery' },
  { id: 'settings', label: 'Paramètres', icon: Settings, href: '/admin/settings' },
];

const categories = [
  { value: 'interior', label: 'Intérieur' },
  { value: 'food', label: 'Plats' },
  { value: 'events', label: 'Événements' },
  { value: 'ambiance', label: 'Ambiance' },
];

// Sample gallery items
const sampleGalleryItems = [
  {
    id: '1',
    title: 'Ambiance Intérieure',
    description: 'Notre salle principale élégante et chaleureuse',
    type: 'image',
    category: 'interior',
    is_featured: true,
  },
  {
    id: '2',
    title: 'Brochette de Gésiers',
    description: 'Notre spécialité maison',
    type: 'image',
    category: 'food',
    is_featured: false,
  },
  {
    id: '3',
    title: 'Présentation Vidéo',
    description: 'Découvrez La Réserve en vidéo',
    type: 'video',
    category: 'ambiance',
    is_featured: true,
  },
];

const AdminGallery = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('gallery');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'interior',
    type: 'image',
    is_featured: false,
    file: null as File | null,
  });

  const filteredItems = sampleGalleryItems.filter((item) => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/admin/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Média ajouté avec succès');
    setIsAddDialogOpen(false);
    setFormData({
      title: '',
      description: '',
      category: 'interior',
      type: 'image',
      is_featured: false,
      file: null,
    });
  };

  const handleDelete = (_id: string) => {
    toast.success('Média supprimé avec succès');
  };

  const handleToggleFeatured = (_id: string) => {
    toast.success('Statut mis à jour');
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
              <h2 className="text-2xl font-bold text-white">Galerie Médias</h2>
              <p className="text-slate-400">Gérez vos photos et vidéos</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter média
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg bg-slate-950 border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-white text-2xl">Ajouter un média</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <Label className="text-slate-300">Titre *</Label>
                    <Input
                      required
                      placeholder="Ex: Ambiance du soir"
                      className="bg-slate-900 border-slate-700 text-white mt-1"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Description</Label>
                    <Textarea
                      placeholder="Description du média..."
                      className="bg-slate-900 border-slate-700 text-white mt-1"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700">
                          <SelectItem value="image" className="text-white">Image</SelectItem>
                          <SelectItem value="video" className="text-white">Vidéo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Catégorie *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
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
                    <Label className="text-slate-300">
                      {formData.type === 'image' ? 'Image' : 'Vidéo'} *
                    </Label>
                    <Input
                      type="file"
                      accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                      className="bg-slate-900 border-slate-700 text-white mt-1"
                      onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                    />
                    <p className="text-slate-500 text-xs mt-1">
                      {formData.type === 'image'
                        ? 'Formats: JPG, PNG, WebP. Max 5MB.'
                        : 'Formats: MP4, WebM. Max 50MB.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label className="text-slate-300">Mettre en avant</Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
                  >
                    Ajouter
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

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-slate-900 border-slate-800 overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center relative">
                    {item.type === 'video' ? (
                      <Video className="w-12 h-12 text-slate-600" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-slate-600" />
                    )}
                    {item.is_featured && (
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                        <StarIcon className="w-4 h-4 text-slate-950 fill-slate-950" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{item.title}</h3>
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
                            onClick={() => handleToggleFeatured(item.id)}
                            className="text-white hover:bg-slate-800 cursor-pointer"
                          >
                            <StarIcon className="w-4 h-4 mr-2" />
                            {item.is_featured ? 'Retirer des favoris' : 'Mettre en avant'}
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
                      <span className="text-xs text-slate-500 uppercase tracking-wider">
                        {categories.find((c) => c.value === item.category)?.label}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.type === 'video'
                          ? 'bg-purple-500/20 text-purple-500'
                          : 'bg-blue-500/20 text-blue-500'
                      }`}>
                        {item.type === 'video' ? 'Vidéo' : 'Image'}
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

export default AdminGallery;
