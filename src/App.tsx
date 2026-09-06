import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { LiveEstimator } from './components/LiveEstimator';
import { ClientsTrust } from './components/ClientsTrust';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

export function App() {
  return (
    <div className="min-h-screen bg-transparent text-on-surface flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Swiss Minimalist Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="pt-20">
        {/* Hero Section with 3D Shopping Mall Island */}
        <Hero />

        {/* Portfolio de Obras Destacadas */}
        <Portfolio />

        {/* Diferenciales Técnicos: Montaje Nocturno, CNC, Materiales Nobles */}
        <TechnicalSpecs />

        {/* Cotizador Rápido Interactivo */}
        <LiveEstimator />

        {/* Empresas & Referencias Comprobables con Contactos */}
        <ClientsTrust />
      </main>

      {/* Swiss Minimalist Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
