import type { Mode } from '../context/mode';

type Step = { title: string; text: string };
type Stat = { value: string; label: string };

export type ModeContent = {
  label: string;
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    primary: string;
    secondary: string;
  };
  stats: Stat[];
  process: { title: string; intro: string; steps: Step[] };
  projects: { title: string; intro: string };
  estimator: { intro: string };
  contactIntro: string;
  trust?: { label: string; items: string[] };
};

export const CONTENT: Record<Mode, ModeContent> = {
  residencial: {
    label: 'Residencial',
    hero: {
      eyebrow: 'Muebles a medida para tu casa · Córdoba',
      title: 'Diseñamos y fabricamos',
      highlight: 'los muebles de tu casa.',
      text: 'Cocinas, placares, vestidores y muebles de living en melamina, pensados a medida y fabricados en nuestro taller. Un solo equipo, del plano a la instalación.',
      primary: 'Calcular presupuesto',
      secondary: 'Ver proyectos',
    },
    stats: [
      { value: '+15 años', label: 'de oficio' },
      { value: '+280', label: 'obras entregadas' },
      { value: 'Taller', label: 'propio en Córdoba' },
      { value: '5 años', label: 'de garantía' },
    ],
    process: {
      title: 'Del plano a tu casa, con el mismo equipo',
      intro: 'No tercerizamos. Quien diseña tu mueble es quien lo fabrica y lo instala, así cada detalle se resuelve antes de cortar la primera placa.',
      steps: [
        { title: 'Visita y medición', text: 'Vamos a tu casa, medimos y escuchamos cómo usás el espacio.' },
        { title: 'Diseño 3D', text: 'Te mostramos el mueble en 3D con materiales, colores y presupuesto cerrado.' },
        { title: 'Fabricación', text: 'Cortamos, canteamos y armamos cada módulo en nuestro taller.' },
        { title: 'Instalación', text: 'Instalamos, ajustamos herrajes y dejamos todo limpio.' },
      ],
    },
    projects: {
      title: 'Proyectos residenciales',
      intro: 'Cocinas, placares, vestidores y livings que diseñamos y fabricamos para familias de Córdoba.',
    },
    estimator: {
      intro: 'Elegí el tipo de mueble, los metros lineales y la terminación. Te mostramos un rango de precio al instante.',
    },
    contactIntro: 'Contanos qué mueble necesitás y coordinamos una visita para medir.',
  },
  comercial: {
    label: 'Comercial',
    hero: {
      eyebrow: 'Equipamiento comercial · Córdoba',
      title: 'Diseñamos y fabricamos',
      highlight: 'el equipamiento de tu comercio.',
      text: 'Locales, mostradores, islas de shopping y oficinas. Fabricamos en taller propio y montamos fuera del horario comercial para que no pierdas ventas.',
      primary: 'Cotizar proyecto',
      secondary: 'Ver obras comerciales',
    },
    stats: [
      { value: '+280', label: 'obras entregadas' },
      { value: 'Nocturno', label: 'montaje en shoppings' },
      { value: 'Taller', label: 'propio en Córdoba' },
      { value: '5 años', label: 'de garantía' },
    ],
    process: {
      title: 'Obras comerciales sin frenar tu negocio',
      intro: 'Coordinamos con la administración del shopping o la dirección de obra, fabricamos todo en taller y montamos en tiempos cortos.',
      steps: [
        { title: 'Relevamiento', text: 'Medimos el local y revisamos la normativa del shopping o edificio.' },
        { title: 'Diseño y aprobación', text: 'Planos, renders y materiales listos para presentar y aprobar.' },
        { title: 'Fabricación', text: 'Producción completa en taller, con materiales de alto tránsito.' },
        { title: 'Montaje', text: 'Instalación nocturna o fuera de horario, en pocas jornadas.' },
      ],
    },
    projects: {
      title: 'Obras comerciales',
      intro: 'Islas de shopping, locales, mostradores y oficinas diseñados y fabricados por Chape.',
    },
    estimator: {
      intro: 'Elegí el tipo de obra, la superficie o los metros y la terminación. Te mostramos un rango de inversión y el plazo de taller.',
    },
    contactIntro: 'Contanos sobre tu local u obra y te respondemos con una propuesta y plazos.',
    trust: {
      label: 'Obras realizadas en',
      items: ['Dinosaurio Mall', 'Córdoba Shopping', 'Paseo del Jockey', 'Nueva Córdoba'],
    },
  },
};
