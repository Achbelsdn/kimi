import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Wine, UtensilsCrossed, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Cuisine Authentique',
    description: 'Des plats traditionnels africains préparés avec passion et authenticité.',
  },
  {
    icon: Wine,
    title: 'Cave à Vin',
    description: 'Une sélection soignée de vins locaux et internationaux.',
  },
  {
    icon: Clock,
    title: 'Ambiance Unique',
    description: 'Un lieu discret et raffiné pour vos moments de détente.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Noté 4.5/5 par nos clients pour la qualité de notre service.',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-500 font-medium text-sm tracking-wider uppercase mb-4 block">
              À Propos de Nous
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif">
              L'Art de la <span className="text-amber-500 italic">Cuisine Africaine</span>
            </h2>
            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>
                La Réserve est bien plus qu'un restaurant - c'est une expérience gastronomique 
                qui célèbre les saveurs authentiques de l'Afrique. Situé au cœur de Cotonou, 
                notre établissement vous invite à découvrir une cuisine riche en traditions 
                et en histoire.
              </p>
              <p>
                Notre chef passionné sélectionne avec soin les meilleurs ingrédients locaux 
                pour créer des plats qui éveillent les sens. De la viande de mouton frite 
                aux brochettes de gésiers, chaque bouchée raconte une histoire.
              </p>
              <p>
                Accompagnez votre repas d'un vin soigneusement choisi dans notre cave, 
                et laissez-vous envelopper par l'ambiance chaleureuse et discrète de La Réserve.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-10">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-500">4.5</div>
                <div className="text-slate-500 text-sm mt-1">Note Moyenne</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-500">6+</div>
                <div className="text-slate-500 text-sm mt-1">Années d'Expérience</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-500">1000+</div>
                <div className="text-slate-500 text-sm mt-1">Clients Satisfaits</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:bg-slate-900"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default About;
