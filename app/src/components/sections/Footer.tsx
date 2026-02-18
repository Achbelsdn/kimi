import { MapPin, Phone, Mail, Clock, Facebook, Instagram, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Accueil', id: 'accueil' },
    { label: 'À Propos', id: 'about' },
    { label: 'Menu', id: 'menu' },
    { label: 'Galerie', id: 'galerie' },
    { label: 'Avis', id: 'avis' },
    { label: 'Réservation', id: 'reservation' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-serif font-bold text-white mb-4">
              <span className="italic text-amber-500">La</span> Réserve
            </h3>
            <p className="text-slate-400 mb-6">
              Une expérience culinaire africaine d'exception dans un cadre élégant et raffiné.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-950 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-950 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">9C77+47F, Cotonou, Bénin</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="tel:+22991117171" className="text-slate-400 hover:text-amber-500 transition-colors">
                  91 11 71 71
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="mailto:contact@lareserve.bj" className="text-slate-400 hover:text-amber-500 transition-colors">
                  contact@lareserve.bj
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-semibold mb-6">Horaires</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-slate-400">Mardi - Dimanche</p>
                  <p className="text-white">14h00 - 03h00</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-600 flex-shrink-0" />
                <div>
                  <p className="text-slate-500">Lundi</p>
                  <p className="text-slate-400">Fermé</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              {currentYear} La Réserve. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">
                Conditions d'utilisation
              </a>
              <a
                href="/admin"
                className="text-slate-600 hover:text-amber-500 text-sm transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
