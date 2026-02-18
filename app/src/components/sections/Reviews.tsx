import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Sample reviews data - will be replaced with data from Supabase
const reviews = [
  {
    id: '1',
    author_name: 'Ampah Johnson',
    rating: 4,
    comment: 'Satisfait à chaque passage! Lieu discret réservant de belles surprises au bar comme en cuisine! Top!',
    created_at: '2021-01-15',
  },
  {
    id: '2',
    author_name: 'Laura M',
    rating: 4,
    comment: 'Belle cave et service de qualité. J\'y retournerai avec plaisir!',
    cuisine_rating: 4,
    service_rating: 5,
    ambiance_rating: 4,
    created_at: '2023-01-20',
  },
  {
    id: '3',
    author_name: 'SOHOUDJI Cégnannou',
    rating: 4,
    comment: 'Calme et discret. Très bon lieu de détente',
    created_at: '2021-01-10',
  },
  {
    id: '4',
    author_name: 'Fresnel Houenaze',
    rating: 5,
    comment: 'cool',
    created_at: '2021-01-08',
  },
];

const StarRating = ({ rating, max = 5, size = 'md' }: { rating: number; max?: number; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating ? 'text-amber-500 fill-amber-500' : 'text-slate-600'
          }`}
        />
      ))}
    </div>
  );
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = () => {
    // Will be implemented with Supabase
    console.log('Submitting review:', newReview);
  };

  return (
    <section id="avis" className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 font-medium text-sm tracking-wider uppercase mb-4 block">
            Témoignages
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif">
            Ce Que Disent Nos <span className="text-amber-500 italic">Clients</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-5xl font-bold text-amber-500">4.5</div>
            <div className="text-left">
              <StarRating rating={4} size="lg" />
              <p className="text-slate-400 text-sm mt-1">Basé sur 6 avis</p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <Quote className="w-10 h-10 text-amber-500/30 mb-4" />
                      <p className="text-xl text-white mb-6 leading-relaxed">
                        "{review.comment}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{review.author_name}</h4>
                            <p className="text-slate-400 text-sm">
                              {new Date(review.created_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                              })}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      
                      {/* Detailed Ratings */}
                      {(review.cuisine_rating || review.service_rating || review.ambiance_rating) && (
                        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4">
                          {review.cuisine_rating && (
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Cuisine</p>
                              <StarRating rating={review.cuisine_rating} size="sm" />
                            </div>
                          )}
                          {review.service_rating && (
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Service</p>
                              <StarRating rating={review.service_rating} size="sm" />
                            </div>
                          )}
                          {review.ambiance_rating && (
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Ambiance</p>
                              <StarRating rating={review.ambiance_rating} size="sm" />
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="rounded-full border-slate-700 text-slate-400 hover:border-amber-500 hover:text-amber-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-amber-500' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="rounded-full border-slate-700 text-slate-400 hover:border-amber-500 hover:text-amber-500"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Add Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-950 rounded-full px-8"
              >
                Laisser un avis
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-950 border-slate-800 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Partagez votre expérience</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">Votre nom</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-slate-900 border-slate-700 text-white mt-1"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Votre note</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= newReview.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment" className="text-slate-300">Votre commentaire</Label>
                  <Textarea
                    id="comment"
                    placeholder="Partagez votre expérience..."
                    className="bg-slate-900 border-slate-700 text-white mt-1 min-h-[100px]"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />
                </div>
                <Button
                  onClick={handleSubmitReview}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
                >
                  Envoyer mon avis
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
