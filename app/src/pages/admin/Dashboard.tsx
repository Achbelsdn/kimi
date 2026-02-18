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
  Users,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin' },
  { id: 'menu', label: 'Gestion du Menu', icon: UtensilsCrossed, href: '/admin/menu' },
  { id: 'reviews', label: 'Avis Clients', icon: Star, href: '/admin/reviews' },
  { id: 'reservations', label: 'Réservations', icon: Calendar, href: '/admin/reservations' },
  { id: 'gallery', label: 'Galerie Médias', icon: Image, href: '/admin/gallery' },
  { id: 'settings', label: 'Paramètres', icon: Settings, href: '/admin/settings' },
];

const stats = [
  { label: 'Réservations ce mois', value: '24', change: '+12%', icon: Calendar, color: 'bg-blue-500' },
  { label: 'Avis en attente', value: '3', change: 'Nouveau', icon: Star, color: 'bg-amber-500' },
  { label: 'Plats au menu', value: '18', change: '+2', icon: UtensilsCrossed, color: 'bg-green-500' },
  { label: 'Visites du site', value: '1.2K', change: '+25%', icon: Users, color: 'bg-purple-500' },
];

const recentReservations = [
  { id: 1, name: 'Jean Dupont', date: '2024-02-20', time: '19:30', guests: 4, status: 'confirmed' },
  { id: 2, name: 'Marie Claire', date: '2024-02-21', time: '20:00', guests: 2, status: 'pending' },
  { id: 3, name: 'Paul Martin', date: '2024-02-22', time: '18:30', guests: 6, status: 'confirmed' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/admin/login');
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
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
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
              <h2 className="text-2xl font-bold text-white">Tableau de bord</h2>
              <p className="text-slate-400">Bienvenue dans votre espace d'administration</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Admin</span>
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <span className="text-amber-500 font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                        <p className="text-green-500 text-sm mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${stat.color}/10 flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Reservations & Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Reservations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Réservations récentes</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/admin/reservations')}
                    className="text-amber-500 hover:text-amber-400"
                  >
                    Voir tout
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800"
                      >
                        <div>
                          <p className="text-white font-medium">{reservation.name}</p>
                          <p className="text-slate-400 text-sm">
                            {reservation.date} à {reservation.time} • {reservation.guests} personnes
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                          {getStatusLabel(reservation.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate('/admin/menu')}
                      className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-colors text-left group"
                    >
                      <UtensilsCrossed className="w-8 h-8 text-amber-500 mb-3" />
                      <p className="text-white font-medium">Ajouter un plat</p>
                      <p className="text-slate-400 text-sm">Nouveau au menu</p>
                    </button>
                    <button
                      onClick={() => navigate('/admin/gallery')}
                      className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-colors text-left group"
                    >
                      <Image className="w-8 h-8 text-amber-500 mb-3" />
                      <p className="text-white font-medium">Ajouter média</p>
                      <p className="text-slate-400 text-sm">Photo ou vidéo</p>
                    </button>
                    <button
                      onClick={() => navigate('/admin/reviews')}
                      className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-colors text-left group"
                    >
                      <Star className="w-8 h-8 text-amber-500 mb-3" />
                      <p className="text-white font-medium">Modérer avis</p>
                      <p className="text-slate-400 text-sm">3 en attente</p>
                    </button>
                    <button
                      onClick={() => navigate('/admin/settings')}
                      className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-colors text-left group"
                    >
                      <Settings className="w-8 h-8 text-amber-500 mb-3" />
                      <p className="text-white font-medium">Paramètres</p>
                      <p className="text-slate-400 text-sm">Infos restaurant</p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
