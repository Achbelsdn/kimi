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
  Users,
  Clock,
  Phone,
  Mail,
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

// Sample reservations
const sampleReservations = [
  {
    id: '1',
    customer_name: 'Jean Dupont',
    customer_email: 'jean@example.com',
    customer_phone: '90 00 00 00',
    reservation_date: '2024-02-20',
    reservation_time: '19:30',
    number_of_guests: 4,
    special_requests: 'Table près de la fenêtre',
    status: 'confirmed',
    created_at: '2024-02-15',
  },
  {
    id: '2',
    customer_name: 'Marie Claire',
    customer_email: 'marie@example.com',
    customer_phone: '91 11 11 11',
    reservation_date: '2024-02-21',
    reservation_time: '20:00',
    number_of_guests: 2,
    special_requests: '',
    status: 'pending',
    created_at: '2024-02-14',
  },
  {
    id: '3',
    customer_name: 'Paul Martin',
    customer_email: 'paul@example.com',
    customer_phone: '92 22 22 22',
    reservation_date: '2024-02-22',
    reservation_time: '18:30',
    number_of_guests: 6,
    special_requests: 'Anniversaire',
    status: 'confirmed',
    created_at: '2024-02-13',
  },
];

const AdminReservations = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('reservations');
  const [filter, setFilter] = useState<string>('all');

  const filteredReservations = sampleReservations.filter((res) => {
    if (filter === 'pending') return res.status === 'pending';
    if (filter === 'confirmed') return res.status === 'confirmed';
    if (filter === 'cancelled') return res.status === 'cancelled';
    return true;
  });

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/admin/login');
  };

  const handleConfirm = (_id: string) => {
    toast.success('Réservation confirmée');
  };

  const handleCancel = (_id: string) => {
    toast.success('Réservation annulée');
  };

  const handleDelete = (_id: string) => {
    toast.success('Réservation supprimée');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-amber-500/20 text-amber-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-slate-500/20 text-slate-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
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
              <h2 className="text-2xl font-bold text-white">Réservations</h2>
              <p className="text-slate-400">Gérez les réservations de vos clients</p>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48 bg-slate-900 border-slate-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all" className="text-white">Toutes</SelectItem>
                <SelectItem value="pending" className="text-white">En attente</SelectItem>
                <SelectItem value="confirmed" className="text-white">Confirmées</SelectItem>
                <SelectItem value="cancelled" className="text-white">Annulées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="grid gap-6">
            {filteredReservations.map((reservation) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-amber-500" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{reservation.customer_name}</h3>
                            <Badge className={getStatusColor(reservation.status)}>
                              {getStatusLabel(reservation.status)}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-300">
                              {new Date(reservation.reservation_date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-300">{reservation.reservation_time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-300">{reservation.number_of_guests} personnes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-300">{reservation.customer_phone}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-400 text-sm">{reservation.customer_email}</span>
                        </div>

                        {reservation.special_requests && (
                          <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
                            <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Demandes spéciales</p>
                            <p className="text-slate-300">{reservation.special_requests}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        {reservation.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleConfirm(reservation.id)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Confirmer
                          </Button>
                        )}
                        {reservation.status !== 'cancelled' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(reservation.id)}
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Annuler
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(reservation.id)}
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

export default AdminReservations;
