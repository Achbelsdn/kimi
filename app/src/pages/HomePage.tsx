import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Menu from '@/components/sections/Menu';
import Gallery from '@/components/sections/Gallery';
import Reviews from '@/components/sections/Reviews';
import Reservation from '@/components/sections/Reservation';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reviews />
      <Reservation />
      <Contact />
      <Footer />
    </main>
  );
};

export default HomePage;
