import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dominio donde se publica el sitio (sin barra al final). Se usa en index.html para la imagen
// que aparece al compartir por WhatsApp y redes, que necesita la dirección completa.
// Si cambia el dominio, actualizarlo acá (o definir VITE_SITE_URL en un archivo .env).
process.env.VITE_SITE_URL ??= 'https://chape-alpha.vercel.app'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
