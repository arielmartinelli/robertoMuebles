# Chape · Sitio web

Sitio de **Chape**, estudio-taller de Córdoba que diseña y fabrica muebles a medida en melamina para casas y comercios.

## Qué tiene

- **Switch Residencial / Comercial**: cambia colores (claro / oscuro), textos, proyectos, presupuestador y formulario de contacto. Se recuerda en el navegador y se puede compartir con `?modo=residencial` o `?modo=comercial`.
- **Inicio** con el isotipo animado (el cajón se abre al cargar y al cambiar de modo).
- **Nosotros**: diseño + fabricación y el proceso de trabajo de cada rubro.
- **Proyectos realizados** filtrables, con ficha técnica de cada obra.
- **Presupuestador en vivo** con rango en ARS / USD, plazo de taller y envío por WhatsApp.
- **Reseñas**: se muestran cuando se cargan en `src/data/reviews.ts`; mientras tanto aparece una invitación a dejar una.
- **Contacto** con validación y envío por WhatsApp.

## Antes de publicar

| Qué | Dónde |
| --- | --- |
| WhatsApp, teléfono, email, dirección, Instagram | `src/config/site.ts` |
| Tarifas del presupuestador y cotización del dólar | `src/config/pricing.ts` y `USD_TO_ARS` en `src/config/site.ts` |
| Fotos y datos reales de las obras | `src/data/projectsData.ts` |
| Reseñas reales (con permiso del cliente) | `src/data/reviews.ts` |
| Textos de cada modo | `src/content/modes.ts` |

## Marca

- Colores: Grafito `#1C1D1B`, Placa blanca `#F3F2EE`, Amarillo corte `#F2B705`, Cemento `#9A9C96`, Acero `#4A5157`.
- Tipografías (servidas desde el propio sitio): Archivo (expandida para títulos) e IBM Plex Mono.
- Isotipo "Cajón": `src/components/brand/ChapeIso.tsx` (geometría en `src/lib/iso.ts`).

## Stack

React 19 + TypeScript + Vite 6 + Tailwind CSS 4 + Framer Motion. Sin Three.js ni librerías pesadas.

```bash
npm install
npm run dev      # desarrollo
npm run build    # compila en dist/
npm run preview  # previsualiza la compilación
npm run lint
```

`public/_headers` trae cabeceras de seguridad (CSP, HSTS, etc.) para Netlify o Cloudflare Pages.
