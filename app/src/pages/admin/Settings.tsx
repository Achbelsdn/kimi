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
  Save,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

const AdminSettings = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('settings');
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    name: 'La Réserve',
    description: 'Une expérience culinaire africaine d\'exception',
    address: '9C77+47F, Cotonou, Bénin',
    phone: '91 11 71 71',
    email: 'contact@lareserve.bj',
    google_maps_url: 'https://maps.app.goo.gl/hDddYVyKbs7ATkWW8',
    opening_hours: {
      monday: { open: '', close: '', closed: true },
      tuesday: { open: '14:00', close: '03:00', closed: false },
      wednesday: { open: '14:00', close: '03:00', closed: false },
      thursday: { open: '14:00', close: '03:00', closed: false },
      friday: { open: '14:00', close: '03:00', closed: false },
      saturday: { open: '14:00', close: '03:00', closed: false },
      sunday: { open: '14:00', close: '03:00', closed: false },
    },
    social_media: {
      facebook: '',
      instagram: '',
    },
  });

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/admin/login');
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Paramètres sauvegardés avec succès');
      setIsSaving(false);
    }, 1000);
  };

  const days = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' },
  ];

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
              <h2 className="text-2xl font-bold text-white">Paramètres</h2>
              <p className="text-slate-400">Configurez les informations de votre restaurant</p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-slate-950" />
                  Sauvegarde...
                </span>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* General Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Informations Générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Nom du restaurant</Label>
                    <Input
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Description</Label>
                    <Textarea
                      value={settings.description}
                      onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Adresse
                    </Label>
                    <Input
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Téléphone
                    </Label>
                    <Input
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">URL Google Maps</Label>
                    <Input
                      value={settings.google_maps_url}
                      onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Horaires d'ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {days.map((day) => (
                      <div key={day.key} className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                        <p className="text-white font-medium mb-3">{day.label}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={settings.opening_hours[day.key as keyof typeof settings.opening_hours].closed}
                              onChange={(e) => {
                                const newHours = { ...settings.opening_hours };
                                (newHours[day.key as keyof typeof newHours] as any).closed = e.target.checked;
                                setSettings({ ...settings, opening_hours: newHours });
                              }}
                              className="rounded border-slate-700 bg-slate-800"
                            />
                            <span className="text-slate-400 text-sm">Fermé</span>
                          </div>
                          {!settings.opening_hours[day.key as keyof typeof settings.opening_hours].closed && (
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                type="time"
                                value={settings.opening_hours[day.key as keyof typeof settings.opening_hours].open}
                                onChange={(e) => {
                                  const newHours = { ...settings.opening_hours };
                                  (newHours[day.key as keyof typeof newHours] as any).open = e.target.value;
                                  setSettings({ ...settings, opening_hours: newHours });
                                }}
                                className="bg-slate-900 border-slate-700 text-white text-sm"
                              />
                              <Input
                                type="time"
                                value={settings.opening_hours[day.key as keyof typeof settings.opening_hours].close}
                                onChange={(e) => {
                                  const newHours = { ...settings.opening_hours };
                                  (newHours[day.key as keyof typeof newHours] as any).close = e.target.value;
                                  setSettings({ ...settings, opening_hours: newHours });
                                }}
                                className="bg-slate-900 border-slate-700 text-white text-sm"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Réseaux Sociaux</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Label>
                    <Input
                      placeholder="https://facebook.com/..."
                      value={settings.social_media.facebook}
                      onChange={(e) => setSettings({
                        ...settings,
                        social_media: { ...settings.social_media, facebook: e.target.value }
                      })}
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </Label>
                    <Input
                      placeholder="https://instagram.com/..."
                      value={settings.social_media.instagram}
                      onChange={(e) => setSettings({
                        ...settings,
                        social_media: { ...settings.social_media, instagram: e.target.value }
                      })}
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                    />
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

export default AdminSettings;
