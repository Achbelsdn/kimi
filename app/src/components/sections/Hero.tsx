import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Video placeholder - user can replace with actual video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/images/hero-bg.jpg"
          loop
          muted
          playsInline
          onPlay={() => {}}
          onPause={() => {}}
        >
          {/* User can add video source here */}
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback gradient background if no video */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Restaurant & Bar à Cotonou
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            <span className="font-serif italic text-amber-500">La</span>{' '}
            <span className="font-serif">Réserve</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-4 font-light"
          >
            Une expérience culinaire africaine d'exception
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto"
          >
            Découvrez l'authenticité de la cuisine africaine dans un cadre élégant et raffiné. 
            Une cave à vin soigneusement sélectionnée pour accompagner vos repas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('reservation')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              Réserver une table
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Voir la vidéo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-slate-950 border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Découvrez La Réserve</DialogTitle>
                </DialogHeader>
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400 text-center p-8">
                    <Play className="w-16 h-16 mx-auto mb-4 text-amber-500" />
                    Emplacement vidéo - Ajoutez votre vidéo de présentation ici
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-slate-400"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>9C77+47F, Cotonou</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-500" />
              <span>91 11 71 71</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>14h00 - 03h00 (Fermé le Lundi)</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-slate-400 hover:text-amber-500 transition-colors"
          >
            <span className="text-sm mb-2">Découvrir</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
