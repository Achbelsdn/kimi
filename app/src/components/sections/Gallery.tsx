import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Image as ImageIcon, Video } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Sample gallery data - will be replaced with data from Supabase
const galleryItems = [
  {
    id: '1',
    title: 'Ambiance Intérieure',
    description: 'Notre salle principale élégante et chaleureuse',
    type: 'image',
    category: 'interior',
  },
  {
    id: '2',
    title: 'Brochette de Gésiers',
    description: 'Notre spécialité maison',
    type: 'image',
    category: 'food',
  },
  {
    id: '3',
    title: 'Présentation Vidéo',
    description: 'Découvrez La Réserve en vidéo',
    type: 'video',
    category: 'ambiance',
  },
  {
    id: '4',
    title: 'Cave à Vin',
    description: 'Notre sélection de vins d\'exception',
    type: 'image',
    category: 'interior',
  },
  {
    id: '5',
    title: 'Viande Mouton Fris',
    description: 'Un plat traditionnel revisité',
    type: 'image',
    category: 'food',
  },
  {
    id: '6',
    title: 'Soirée Spéciale',
    description: 'Un moment inoubliable',
    type: 'video',
    category: 'events',
  },
];

const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'interior', label: 'Intérieur' },
  { id: 'food', label: 'Plats' },
  { id: 'events', label: 'Événements' },
  { id: 'ambiance', label: 'Ambiance' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="galerie" className="relative py-24 sm:py-32 bg-slate-950">
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
            Galerie
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif">
            Moments <span className="text-amber-500 italic">Capturés</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Plongez dans l'atmosphère unique de La Réserve à travers nos photos et vidéos
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
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid - Masonry Style */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index % 3 === 0 ? 'row-span-2' : ''
              }`}
            >
              {/* Placeholder Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-700 transition-transform duration-500 group-hover:scale-110" />
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {item.type === 'video' ? (
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/40 transition-colors">
                    <Play className="w-8 h-8 text-amber-500 ml-1" />
                  </div>
                ) : (
                  <ImageIcon className="w-12 h-12 text-slate-600 group-hover:text-amber-500/50 transition-colors" />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-1">
                  {item.type === 'video' ? (
                    <Video className="w-4 h-4 text-amber-500" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="text-xs text-amber-500 uppercase tracking-wider">
                    {item.type === 'video' ? 'Vidéo' : 'Photo'}
                  </span>
                </div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/50 rounded-2xl transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Video/Image Placeholder Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 border-dashed"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Emplacements Médias</h4>
              <p className="text-slate-400 text-sm">
                Cette galerie contient des emplacements pour vos photos et vidéos. 
                Via le panel admin, vous pourrez ajouter facilement vos propres médias 
                qui remplaceront ces placeholders.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl bg-slate-950 border-slate-800 p-0 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center relative">
            {selectedItem?.type === 'video' ? (
              <>
                <Play className="w-20 h-20 text-amber-500" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/80 rounded-lg">
                  <p className="text-white text-center">
                    Emplacement vidéo - Ajoutez votre vidéo via le panel admin
                  </p>
                </div>
              </>
            ) : (
              <>
                <ImageIcon className="w-20 h-20 text-slate-600" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/80 rounded-lg">
                  <p className="text-white text-center">
                    Emplacement photo - Ajoutez votre image via le panel admin
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">{selectedItem?.title}</h3>
            <p className="text-slate-400">{selectedItem?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
