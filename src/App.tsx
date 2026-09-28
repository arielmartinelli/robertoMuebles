import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { ModeProvider } from './context/ModeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { LiveEstimator } from './components/LiveEstimator';
import { Reviews } from './components/Reviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { BackToTop } from './components/ui/BackToTop';
import { ModeTransition } from './components/ui/ModeTransition';

export function App() {
  return (
    <ModeProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <Navbar />
          <main id="contenido">
            <Hero />
            <About />
            <Portfolio />
            <LiveEstimator />
            <Reviews />
            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
          <ModeTransition />
        </MotionConfig>
      </LazyMotion>
    </ModeProvider>
  );
}

export default App;
