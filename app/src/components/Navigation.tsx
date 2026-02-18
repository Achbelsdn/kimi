import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Accueil', id: 'accueil' },
    { label: 'À Propos', id: 'about' },
    { label: 'Menu', id: 'menu' },
    { label: 'Galerie', id: 'galerie' },
    { label: 'Avis', id: 'avis' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-2xl font-serif font-bold text-white"
            >
              <span className="italic text-amber-500">La</span> Réserve
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-slate-400 hover:text-amber-500 transition-colors text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+22991117171"
                className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">91 11 71 71</span>
              </a>
              <Button
                onClick={() => scrollToSection('reservation')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-full px-6"
              >
                Réserver
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-20 md:hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-xl text-white hover:text-amber-500 transition-colors py-3 border-b border-slate-800"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-6 space-y-4">
                <a
                  href="tel:+22991117171"
                  className="flex items-center gap-3 text-slate-400"
                >
                  <Phone className="w-5 h-5" />
                  <span>91 11 71 71</span>
                </a>
                <Button
                  onClick={() => scrollToSection('reservation')}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold py-6"
                >
                  Réserver une table
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
