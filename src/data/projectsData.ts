import type { Project } from '../types';

// PENDIENTE: reemplazar fotos de referencia (Unsplash) por fotos reales de las obras de Chape.

export const PROJECTS_DATA: Project[] = [
  {
    id: 'jacinto-dino-busto',
    segment: 'comercial',
    type: 'mostrador',
    title: 'Mostrador Principal y Barra de Atención - Jacinto',
    client: 'Jacinto Café & Bistro',
    location: 'Dinosaurio Mall (Rodríguez del Busto), Córdoba',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    description: 'Diseño, fabricación y montaje integral de mostrador curvilíneo para alto tránsito, con frente varillado en madera noble, iluminación LED rasante y mesada en mármol ultra-resistente para cafetería de especialidad.',
    materials: ['Varillado Petiribí Macizo', 'Tapa Granito Negro Absoluto', 'Herrajes Blum Cierre Suave', 'Canalización Eléctrica Oculta'],
    specs: {
      dimensions: '4.80m de frente × 0.95m de profundidad × 1.15m de altura',
      finish: 'Hidrolaca poliuretánica mate alto tránsito (Ignífugo)',
      hardware: 'Guías tándem ocultas Blum con freno y amortiguación',
      timeframe: 'Fabricación: 18 días | Montaje nocturno en shopping: 2 noches'
    }
  },
  {
    id: 'jacinto-isla-dino-alto-verde',
    segment: 'comercial',
    type: 'isla',
    title: 'Isla Comercial 360° - Jacinto Deli & To Go',
    client: 'Jacinto Sucursal Shopping',
    location: 'Dinosaurio Mall (Alto Verde / Mall Central), Córdoba',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
    description: 'Estructura autoportante de isla comercial 360° para pasillo de shopping. Vitrinas de vidrio templado 10mm, iluminación perimetral dimerizable, zócalo de acero inoxidable contra golpes de carros y carrocería técnica.',
    materials: ['Enchapado Nogal Americano', 'Estructura Acero Estructural', 'Vidrio Templado 10mm', 'Zócalo Inox'],
    specs: {
      dimensions: '3.50m × 2.60m × 1.20m (Cumple cota visual de shopping)',
      finish: 'Laca poliuretánica satinada 3 capas UV',
      hardware: 'Cerraduras computarizadas unificadas Hafele',
      timeframe: 'Fabricación: 21 días | Montaje express: 1 jornada'
    }
  },
  {
    id: 'isla-tech-shopping',
    segment: 'comercial',
    type: 'isla',
    title: 'Isla Comercial Tecnológica & Accesorios',
    client: 'iZone Technology',
    location: 'Córdoba Shopping (Villa Cabrera), Córdoba',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    description: 'Isla comercial interactiva para exhibición de productos con sistema antirrobo integrado, iluminación perimetral blanca neutra 4000K, exhibidores acrílicos termoformados y muebles bajo mesada para stock.',
    materials: ['MDF Laqueado Blanco Satinado', 'Perfiles de Aluminio Anodizado', 'Acrílico Cristal 6mm', 'Tapas de Corian'],
    specs: {
      dimensions: '4.00m × 3.00m × 1.10m',
      finish: 'Pintura poliuretánica bicomponente al horno',
      hardware: 'Cerraduras magnéticas con tarjetas RFID',
      timeframe: 'Fabricación: 15 días | Montaje: 1 noche'
    }
  },
  {
    id: 'mostrador-recepcion-corporativo',
    segment: 'comercial',
    type: 'mostrador',
    title: 'Front Desk Monolítico con Luz Rasante',
    client: 'Torres Capitalinas / Corporativo',
    location: 'Nueva Córdoba, Córdoba',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    description: 'Mostrador de recepción de gran formato con efecto de bloque flotante. Combinación de porcelánico de gran masa, madera de paraíso seleccionada e iluminación LED indirecta hacia el piso.',
    materials: ['Porcelánico Calacatta Gold', 'Paraíso Lustre Natural', 'Subestructura Metálica', 'Grommets de Conectividad'],
    specs: {
      dimensions: '3.60m × 0.85m × 1.10m',
      finish: 'Poliuretano cristal mate anti-huella',
      hardware: 'Pasa-cables ocultos con puertos USB-C integrados',
      timeframe: 'Fabricación: 14 días | Montaje: 8 horas'
    }
  },
  {
    id: 'boutique-retail-comercial',
    segment: 'comercial',
    type: 'local',
    title: 'Equipamiento Comercial y Exhibidores para Boutique',
    client: 'Sartori Concept Store',
    location: 'Paseo del Jockey (Jardín), Córdoba',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    description: 'Desarrollo completo de local comercial: percheros empotrados en caño de bronce satinado, mesas de exhibición central con cajones de terciopelo y mueble de caja registradora con panel acústico.',
    materials: ['Hierro Pintado Oro Mate', 'Roble Bardolino', 'Tapicería Lino Graso', 'Vidrio Fumé'],
    specs: {
      dimensions: 'Superficie de local: 85m² de amoblamiento modular',
      finish: 'Pintura electrostática en polvo curada a 200°C',
      hardware: 'Correderas ocultas push to open Grass',
      timeframe: 'Fabricación: 25 días | Montaje en local: 3 días'
    }
  },
  {
    id: 'cocina-particular-gourmet',
    segment: 'residencial',
    type: 'cocina',
    title: 'Cocina de Alta Gama con Isla Desayunadora',
    client: 'Residencia Privada',
    location: 'Country Las Delicias, Córdoba',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
    description: 'Amoblamiento de cocina integral con isla de 3 metros, golas negras continuas, columnas despenseras con herrajes extraíbles y sector de cavas con iluminación cálida oculta.',
    materials: ['Melamina Gris Grafito Seda', 'Roble Termotratado', 'Mesada Neolith Nero Marquina', 'Gola de Aluminio Negro'],
    specs: {
      dimensions: 'Bajo mesada: 6.20m lineales + Isla central: 3.00m × 1.20m',
      finish: 'Superficie soft touch ultra mate antihuellas',
      hardware: 'Bisagras Blum Clip-top Blumotion con freno integrado',
      timeframe: 'Fabricación: 20 días | Montaje en obra: 2 días'
    }
  },
  {
    id: 'vestidor-walkin-particular',
    segment: 'residencial',
    type: 'placard',
    title: 'Vestidor Walk-In Master Suite de Piso a Techo',
    client: 'Residencia Privada',
    location: 'Villa Belgrano, Córdoba',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
    description: 'Vestidor diseñado a medida con perfilería de aluminio negro anodizado, iluminación perimetral en cada estante activada por sensor de proximidad, isla central con gavetero alhajero en cuero ecológico.',
    materials: ['Melamina Roble Escandinavo', 'Perfiles de Aluminio Anodizado Negro', 'Vidrio Stopsol Bronce', 'LED 2700K'],
    specs: {
      dimensions: 'Ambiente de 4.50m × 3.80m de piso a techo (2.70m altura)',
      finish: 'Terminación veta sincronizada textura profunda',
      hardware: 'Pantaloneros y zapateros telescópicos de extracción total',
      timeframe: 'Fabricación: 16 días | Montaje: 2 días'
    }
  },
  {
    id: 'living-tv-flotante',
    segment: 'residencial',
    type: 'living',
    title: 'Mueble de TV Flotante y Biblioteca',
    client: 'Residencia Privada',
    location: 'Barrio Jardín, Córdoba',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    description: 'Rack flotante de 2,40 m con cajones push, pasacables ocultos y biblioteca lateral en módulos abiertos. Melamina blanca con detalles en roble.',
    materials: ['Melamina Blanco Seda', 'Melamina Roble Natural', 'Herrajes Push to Open', 'Pasacables Ocultos'],
    specs: {
      dimensions: 'Rack 2.40m × 0.40m + biblioteca 0.90m × 2.20m',
      finish: 'Melamina texturada con canto ABS 2 mm',
      hardware: 'Correderas ocultas push to open',
      timeframe: 'Fabricación: 10 días | Instalación: 1 día'
    }
  },
  {
    id: 'modulo-guardado-pared',
    segment: 'residencial',
    type: 'placard',
    title: 'Módulo de Guardado Suspendido',
    client: 'Departamento Particular',
    location: 'Nueva Córdoba, Córdoba',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop',
    description: 'Mueble modular suspendido que combina puertas y nichos abiertos, pensado para aprovechar una pared chica sin quitar espacio de circulación.',
    materials: ['Melamina Roble Escandinavo', 'Soportes Ocultos de Acero', 'Bisagras Cierre Suave'],
    specs: {
      dimensions: '1.60m × 0.35m × 1.20m',
      finish: 'Veta sincronizada textura profunda',
      hardware: 'Bisagras Blum con cierre suave',
      timeframe: 'Fabricación: 8 días | Instalación: medio día'
    }
  }
];
