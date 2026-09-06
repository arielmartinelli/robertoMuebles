# robertoMuebles

Landing page de alta conversión y precisión técnica para **Roberto Muebles** (Arquitectura Comercial, Retail Millwork y Mobiliario a Medida para Shoppings y Locales Comerciales en Córdoba, Argentina).

---

## 🚀 Características Principales

- **Visualizador 3D Interactivo (Three.js)**:
  - Modelo paramétrico de isla / stand comercial para shopping mall.
  - Techo pérgola en "L" con listones de madera clara y cajas lumínicas.
  - Vitrinas perimetrales iluminadas con bases chanfleadas y estantes de vidrio.
  - Modos de interacción: rotación 360°, zoom, control de encendido de luces y vista explosionada técnica (*despiece de montaje*).
- **Cotizador Técnico Preliminar**:
  - Ajuste metro a metro de superficie con input manual y botones de paso.
  - Selección de tipología (Isla/Stand, Local Comercial, Franquicia/Cadena) y materialidad técnica (Placa Melamínica, Ebanistería Maciza, Cero Ignífugo B-s1 / Vidrio Templado).
  - Cálculo instantáneo de costo estimado (ARS / USD), tiempo de fabricación en taller CNC y noches de montaje requeridas.
  - Estética de hoja de planos arquitectónicos (`RM-01`) con coordenadas numéricas perimetrales y cotización directa por WhatsApp.
- **Portafolio de Obras**:
  - Grilla de proyectos destacados (Jacinto Café, Dinosaurio Mall, iZone Apple Reseller, Sartori Joyería).
  - Modal de inspección técnica con fichas de materiales, herrajes Blum/Häfele y plazos de ejecución.
- **Estándares de Montaje y Homologación**:
  - Montaje nocturno certificado sin interrupción de ventas en centros comerciales.
  - Acreditación para trabajos en shoppings (Dino Mall, Alto Verde, Córdoba Shopping, etc.).

---

## 🛠️ Stack Tecnológico

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D / Gráficos**: [Three.js](https://threejs.org/)
- **Efectos**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Tipografías**: *Plus Jakarta Sans*, *Inter*, *JetBrains Mono*

---

## 💻 Instalación y Desarrollo

1. Clonar el repositorio:
   ```bash
   git clone git@github.com:arielmartinelli/robertoMuebles.git
   cd robertoMuebles
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Generar build de producción:
   ```bash
   npm run build
   ```

5. Previsualizar build:
   ```bash
   npm run preview
   ```

---

## 📐 Diseño y Arquitectura

Diseñado bajo principios de diseño editorial suizo y arquitectura técnica de planos:
- Fondo con grilla de planos milimetrados (`64px x 64px`).
- Paleta tonal neutra arquitectónica: Marfil (`#faf9f6`), Ceniza (`#f4f2ee`), Grafito (`#111110`) y Acento Nogal (`#915b36`).
