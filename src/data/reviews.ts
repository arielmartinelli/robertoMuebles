import type { Review } from '../types';

/**
 * Reseñas reales de clientes. Cargar solo opiniones reales y con permiso del cliente.
 * Mientras la lista esté vacía, la sección muestra una invitación a dejar una reseña.
 *
 * Ejemplo de formato:
 * { name: 'Nombre A.', segment: 'residencial', project: 'Cocina', text: '...', rating: 5 }
 */
export const REVIEWS: Review[] = [];
