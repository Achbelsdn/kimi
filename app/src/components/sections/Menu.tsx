import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChefHat, Wine, Coffee, IceCream, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { MenuCategory } from '@/types';

// Sample menu data - will be replaced with data from Supabase
const menuItems = [
  {
    id: '1',
    name: 'Viande Mouton Fris',
    description: 'Viande de mouton frite accompagnée de riz et sauce aux légumes frais',
    price: 8500,
    category: 'mains' as MenuCategory,
    image_url: '/images/dishes/mouton-fris.jpg',
  },
  {
    id: '2',
    name: 'Brochette de Gésiers',
    description: 'Brochette de gésiers marinés et grillés aux épices africaines',
    price: 4500,
    category: 'starters' as MenuCategory,
    image_url: '/images/dishes/brochette-gesiers.jpg',
  },
  {
    id: '3',
    name: 'Sauté de Fromage Warangachi',
    description: 'Fromage local warangachi sauté aux fines herbes et épices',
    price: 5500,
    category: 'starters' as MenuCategory,
    image_url: '/images/dishes/warangachi.jpg',
  },
  {
    id: '4',
    name: 'Poulet DG',
    description: 'Poulet frit servi avec des bananes plantains et légumes sautés',
    price: 9500,
    category: 'mains' as MenuCategory,
    image_url: '/images/dishes/poulet-dg.jpg',
  },
  {
    id: '5',
    name: 'Vin Blanc - Château',
    description: 'Sélection de vin blanc sec, parfait avec les fruits de mer',
    price: 15000,
    category: 'wines' as MenuCategory,
    image_url: '/images/dishes/vin-blanc.jpg',
  },
  {
    id: '6',
    name: 'Plessis-Duval Saumur',
    description: 'Vin rouge d\'exception, millésime 2022',
    price: 25000,
    category: 'wines' as MenuCategory,
    image_url: '/images/dishes/vin-rouge.jpg',
  },
  {
    id: '7',
    name: 'Jus de Bissap',
    description: 'Jus frais de fleurs d\'hibiscus, rafraîchissant et vitaminé',
    price: 2000,
    category: 'drinks' as MenuCategory,
    image_url: '/images/dishes/bissap.jpg',
  },
  {
    id: '8',
    name: 'Dégue',
    description: 'Dessert traditionnel à base de couscous de mil et lait caillé',
    price: 3500,
    category: 'desserts' as MenuCategory,
    image_url: '/images/dishes/degue.jpg',
  },
];

const categories = [
  { id: 'all', label: 'Tout le Menu', icon: UtensilsCrossed },
  { id: 'starters', label: 'Entrées', icon: UtensilsCrossed },
  { id: 'mains', label: 'Plats Principaux', icon: ChefHat },
  { id: 'desserts', label: 'Desserts', icon: IceCream },
  { id: 'drinks', label: 'Boissons', icon: Coffee },
  { id: 'wines', label: 'Vins', icon: Wine },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-slate-950">
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
            Notre Carte
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif">
            Découvrez Nos <span className="text-amber-500 italic">Spécialités</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Une sélection de plats authentiques préparés avec amour et tradition
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-600'
                  : 'border-slate-700 text-slate-400 hover:border-amber-500 hover:text-amber-500'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300">
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-slate-800">
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <UtensilsCrossed className="w-16 h-16 text-slate-600 group-hover:text-amber-500/50 transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-amber-500 transition-colors">
                      {item.name}
                    </h3>
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-0">
                      {formatPrice(item.price)}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Item Detail Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-lg bg-slate-950 border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-white">
                {selectedItem?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                <UtensilsCrossed className="w-20 h-20 text-slate-600" />
              </div>
              <p className="text-slate-400">{selectedItem?.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-2xl font-bold text-amber-500">
                  {selectedItem && formatPrice(selectedItem.price)}
                </span>
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950">
                  Commander
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Menu;
