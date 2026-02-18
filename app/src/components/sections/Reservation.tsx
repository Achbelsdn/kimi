import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const timeSlots = [
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, '9+'];

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - will be replaced with Supabase
    setTimeout(() => {
      toast.success('Réservation envoyée avec succès! Nous vous contacterons pour confirmation.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        specialRequests: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="reservation" className="relative py-24 sm:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-500 font-medium text-sm tracking-wider uppercase mb-4 block">
              Réserver une Table
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif">
              Réservez Votre <span className="text-amber-500 italic">Table</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Pour une expérience gastronomique inoubliable, réservez votre table en avance. 
              Notre équipe se fera un plaisir de vous accueillir.
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Horaires d'ouverture</h4>
                    <p className="text-slate-400">Mardi - Dimanche: 14h00 - 03h00</p>
                    <p className="text-slate-500 text-sm">Fermé le Lundi</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Téléphone</h4>
                    <p className="text-slate-400">91 11 71 71</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-slate-400">contact@lareserve.bj</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Right Content - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nom complet *
                      </Label>
                      <Input
                        id="name"
                        required
                        placeholder="John Doe"
                        className="bg-slate-950 border-slate-700 text-white mt-1"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="bg-slate-950 border-slate-700 text-white mt-1"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-slate-300 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Téléphone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="91 11 71 71"
                      className="bg-slate-950 border-slate-700 text-white mt-1"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-slate-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        className="bg-slate-950 border-slate-700 text-white mt-1"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Heure *
                      </Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => handleChange('time', value)}
                      >
                        <SelectTrigger className="bg-slate-950 border-slate-700 text-white mt-1">
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time} className="text-white">
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Nombre de personnes *
                    </Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) => handleChange('guests', value)}
                    >
                      <SelectTrigger className="bg-slate-950 border-slate-700 text-white mt-1">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {guestOptions.map((num) => (
                          <SelectItem key={num} value={num.toString()} className="text-white">
                            {num} {num === 1 ? 'personne' : 'personnes'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="requests" className="text-slate-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Demandes spéciales
                    </Label>
                    <Textarea
                      id="requests"
                      placeholder="Allergies, occasion spéciale, préférences..."
                      className="bg-slate-950 border-slate-700 text-white mt-1 min-h-[100px]"
                      value={formData.specialRequests}
                      onChange={(e) => handleChange('specialRequests', e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold py-6 text-lg rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-slate-950" />
                        Envoi en cours...
                      </span>
                    ) : (
                      'Confirmer la réservation'
                    )}
                  </Button>

                  <p className="text-slate-500 text-sm text-center">
                    * Champs obligatoires. Vous recevrez une confirmation par email.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
