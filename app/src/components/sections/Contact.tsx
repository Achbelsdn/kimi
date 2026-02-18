import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const googleMapsUrl = 'https://maps.app.goo.gl/hDddYVyKbs7ATkWW8';

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 font-medium text-sm tracking-wider uppercase mb-4 block">
            Contact
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif">
            Venez Nous <span className="text-amber-500 italic">Rencontrer</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Nous sommes impatients de vous accueillir et de vous faire découvrir 
            l'expérience La Réserve.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-4"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-colors group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <MapPin className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Adresse</h4>
                    <p className="text-slate-400">9C77+47F, Cotonou, Bénin</p>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-500 text-sm mt-2 hover:underline"
                    >
                      Voir sur Google Maps
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-colors group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Téléphone</h4>
                    <p className="text-slate-400">91 11 71 71</p>
                    <a
                      href="tel:+22991117171"
                      className="inline-flex items-center gap-1 text-amber-500 text-sm mt-2 hover:underline"
                    >
                      Appeler maintenant
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-colors group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Horaires</h4>
                    <div className="text-slate-400 text-sm space-y-1">
                      <p>Mardi - Dimanche: 14h00 - 03h00</p>
                      <p className="text-slate-500">Fermé le Lundi</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-slate-700 text-slate-400 hover:border-amber-500 hover:text-amber-500"
                  >
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-slate-700 text-slate-400 hover:border-amber-500 hover:text-amber-500"
                  >
                    <Instagram className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-900 border-slate-800 h-full overflow-hidden">
              <CardContent className="p-0 h-full min-h-[400px] relative">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5!2d2.43!3d6.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjInMTIuMCJOIDLCsDI1JzQ4LjAiRQ!5e0!3m2!1sfr!2sbj!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="La Réserve - Cotonou"
                />
                
                {/* Overlay with link to open in Google Maps */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Ouvrir dans Google Maps
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
