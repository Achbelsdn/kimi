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
  Check,
  X,
  Trash2,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin' },
  { id: 'menu', label: 'Gestion du Menu', icon: UtensilsCrossed, href: '/admin/menu' },
  { id: 'reviews', label: 'Avis Clients', icon: Star, href: '/admin/reviews' },
  { id: 'reservations', label: 'Réservations', icon: Calendar, href: '/admin/reservations' },
  { id: 'gallery', label: 'Galerie Médias', icon: Image, href: '/admin/gallery' },
  { id: 'settings', label: 'Paramètres', icon: Settings, href: '/admin/settings' },
];

// Sample reviews
const sampleReviews = [
  {
    id: '1',
    author_name: 'Ampah Johnson',
    rating: 4,
    comment: 'Satisfait à chaque passage! Lieu discret réservant de belles surprises au bar comme en cuisine! Top!',
    is_approved: true,
    created_at: '2024-02-15',
  },
  {
    id: '2',
    author_name: 'Laura M',
    rating: 4,
    comment: 'Belle cave et service de qualité. J\'y retournerai avec plaisir!',
    cuisine_rating: 4,
    service_rating: 5,
    ambiance_rating: 4,
    is_approved: false,
    created_at: '2024-02-14',
  },
  {
    id: '3',
    author_name: 'SOHOUDJI Cégnannou',
    rating: 4,
    comment: 'Calme et discret. Très bon lieu de détente',
    is_approved: true,
    created_at: '2024-02-13',
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-slate-600'}`}
      />
    ))}
  </div>
);

const AdminReviews = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('reviews');
  const [filter, setFilter] = useState<string>('all');

  const filteredReviews = sampleReviews.filter((review) => {
    if (filter === 'pending') return !review.is_approved;
    if (filter === 'approved') return review.is_approved;
    return true;
  });

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/admin/login');
  };

  const handleApprove = (_id: string) => {
    toast.success('Avis approuvé');
  };

  const handleReject = (_id: string) => {
    toast.success('Avis rejeté');
  };

  const handleDelete = (_id: string) => {
    toast.success('Avis supprimé');
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
              <h2 className="text-2xl font-bold text-white">Avis Clients</h2>
              <p className="text-slate-400">Modérez et gérez les avis de vos clients</p>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48 bg-slate-900 border-slate-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all" className="text-white">Tous les avis</SelectItem>
                <SelectItem value="pending" className="text-white">En attente</SelectItem>
                <SelectItem value="approved" className="text-white">Approuvés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="grid gap-6">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <span className="text-amber-500 font-semibold text-lg">
                              {review.author_name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{review.author_name}</h3>
                            <p className="text-slate-500 text-sm">
                              {new Date(review.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <Badge
                            className={
                              review.is_approved
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-amber-500/20 text-amber-500'
                            }
                          >
                            {review.is_approved ? 'Approuvé' : 'En attente'}
                          </Badge>
                        </div>

                        <StarRating rating={review.rating} />

                        <p className="text-slate-300 mt-4">"{review.comment}"</p>

                        {(review.cuisine_rating || review.service_rating || review.ambiance_rating) && (
                          <div className="flex gap-6 mt-4">
                            {review.cuisine_rating && (
                              <div>
                                <p className="text-slate-500 text-xs">Cuisine</p>
                                <StarRating rating={review.cuisine_rating} />
                              </div>
                            )}
                            {review.service_rating && (
                              <div>
                                <p className="text-slate-500 text-xs">Service</p>
                                <StarRating rating={review.service_rating} />
                              </div>
                            )}
                            {review.ambiance_rating && (
                              <div>
                                <p className="text-slate-500 text-xs">Ambiance</p>
                                <StarRating rating={review.ambiance_rating} />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        {!review.is_approved && (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(review.id)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approuver
                          </Button>
                        )}
                        {!review.is_approved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(review.id)}
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Rejeter
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(review.id)}
                          className="border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
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

export default AdminReviews;
