import type { Mode } from '../context/mode';

export type ProjectType = 'cocina' | 'placard' | 'living' | 'isla' | 'local' | 'mostrador';

export interface Project {
  id: string;
  segment: Mode;
  type: ProjectType;
  title: string;
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
}

export interface Review {
  name: string;
  segment: Mode;
  project: string;
  text: string;
  /** 1 a 5 */
  rating: number;
}
