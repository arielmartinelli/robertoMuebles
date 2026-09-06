export type ProjectCategory = 'todos' | 'comercial' | 'islas' | 'mostradores' | 'particular';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  client: string;
  location: string;
  image: string;
  description: string;
  materials: string[];
  specs: {
    dimensions: string;
    finish: string;
    hardware: string;
    timeframe: string;
  };
  highlight?: boolean;
}

export type ProjectType = 'isla_shopping' | 'local_comercial' | 'mostrador' | 'particular_cocina' | 'particular_vestidor';

export type MaterialType = 'melamina_premium' | 'enchapado_natural' | 'madera_maciza' | 'hierro_madera';

export type CountertopType = 'melamina' | 'madera_lustrada' | 'marmol' | 'silestone';

export interface QuoteConfig {
  projectType: ProjectType;
  meters: number;
  material: MaterialType;
  countertop: CountertopType;
  hasLedLighting: boolean;
  hasPremiumHardware: boolean;
  hasSecurityGlass: boolean;
  hasSmartLocks: boolean;
  currency: 'ARS' | 'USD';
}

export interface MaterialFinishOption {
  id: string;
  name: string;
  color: string;
  texture: string;
  metalColor?: string;
}
