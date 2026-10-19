# Johan MV — espacio personal

Web implementada en el proyecto existente con React 19, Vite, TypeScript, pnpm, Tailwind CSS v4 y Motion para React. Sin backend ni autenticación.

## Ejecutar

- `pnpm install`
- `pnpm dev`
- `pnpm build` (incluye TypeScript)
- `pnpm preview`

Para Vercel: framework Vite, comando `pnpm build`, directorio `dist`. `vercel.json` permite abrir directamente las rutas internas. No se ha publicado el sitio.

## Diseño

Referencias conservadas en `design/references`. Los requisitos explícitos del usuario prevalecen sobre las reglas genéricas de Taste Skill: se mantienen títulos de cuatro líneas, marcos, pestañas, contornos, etiquetas y subrayados amarillos. No se ha sorteado una dirección visual alternativa.

- Fondo: #FAF9F0.
- Marco, navegación y texto: #080808.
- Acento: #FFE229.
- Texto secundario: #626267.
- Tarjetas: #FFFFFF; separadores: #DEDED8.
- Fuentes locales: Anton 400 e Inter 400/500/600/700, sin solicitudes a Google Fonts en tiempo de ejecución.
- Marco de 12 px en escritorio, 7–8 px en dispositivos pequeños; margen exterior visible.
- Transiciones de 200–350 ms, indicador de navegación animado, entradas discretas, hover de 3 px y zoom de imágenes de hasta 1.02. Respeta reduced motion.

## Estructura

- `src/App.tsx`: rutas, transición entre páginas, títulos y foco de navegación.
- `src/components/Header.tsx`: navegación y menú móvil.
- `src/components/UI.tsx`: paneles, imágenes geométricas, enlaces y apariciones.
- `src/components/SocialLinks.tsx`: tarjetas sociales e iconos.
- `src/components/Lightbox.tsx`: diálogo nativo, foco, Escape y flechas.
- `src/pages/`: Inicio, Sobre mí, Galería, Blog y Contacto.
- `src/data/socialLinks.ts`: todos los destinos sociales y Spotify.
- `src/data/articles.ts`: cuatro artículos, URL y metadatos configurables.
- `src/data/gallery.ts`: fotografías y categorías reemplazables.
- `src/index.css`: tokens, composición y responsive.

La galería abre con una selección editorial mixta de cinco fotos, como la referencia. Al seleccionar Yo, Mascotas, Deporte o Ciencia se muestran exclusivamente las imágenes de esa categoría. El filtro activo es amarillo. Un enlace permite volver a la selección completa. Nunca se muestran más de siete fotografías.

## Contenido pendiente

Los tres últimos artículos tienen `url: null`, `date: null` y `readingMinutes: null`. La interfaz muestra «Enlace pendiente» y no presenta botones falsos. El primer artículo utiliza la URL exacta proporcionada; sus fechas y minutos tampoco se inventan. Para habilitar un artículo basta con completar su URL en `src/data/articles.ts`.

La fotografía de Sobre mí es un paisaje provisional, ya que solo se proporcionaron dos retratos para Inicio y no se debe inventar otro rostro ni repetir una foto de relleno. Las dos fotos personales aparecen también en su sección correspondiente de la galería. Las imágenes temáticas de galería y blog se pueden sustituir por las definitivas.

Los textos personales de las referencias (Lima, ingeniería, gustos y tarde-noche) se han conservado como contenido editable.

## Recursos

Originales personales preservados en `design/originals`; versiones optimizadas WebP en `public/images`, sin modificación de rasgos. Las referencias no están incrustadas en la web. El resto son fotografías temáticas de Unsplash, descargadas localmente, bajo su licencia gratuita: https://unsplash.com/license. Listado completo de fuentes en `public/image-credits.txt`, enlazado desde Galería y Blog.

Iconos de interfaz: Lucide. Marcas: Simple Icons y símbolo vectorial de LinkedIn. Fuentes: Fontsource, licencia SIL OFL. `scripts/prepare-assets.mjs` documenta el proceso de optimización y descarga.

Spotify usa el iframe oficial de la playlist proporcionada. Se verificó la carga de su contenido real en Edge; la reproducción y disponibilidad dependen del servicio y sus restricciones. Hay enlace directo de respaldo. No se simulan controles ni canciones.

## Verificación

`pnpm build` incluye `tsc --noEmit`. Las pruebas de navegador de `scripts/verify.mjs` recorren cinco rutas a 1440, 768, 390 y 320 px; revisan imágenes y desbordamientos, filtros, lightbox con teclado, Escape, menú móvil, URL del embed y contenido con movimiento reducido. Se ejecutan con Edge instalado: `node scripts/verify.mjs` (requiere el servidor de desarrollo).

Capturas y resultados: `design/qa/`. El inspector incluido en Taste Skill no pudo iniciar Chrome (salida temprana de proceso); se sustituyó su revisión por Edge/Playwright. No se declara aprobado ese inspector.

## Ajuste al viewport de escritorio

El contenedor se centra con `100dvh` y conserva los cuatro lados del marco. En escritorio, las dimensiones fluidas se calculan con `clamp()` y unidades `dvh`; se ajustan títulos, fotografías, tarjetas, navegación y espacios según ancho y alto disponibles. No se aplica `transform: scale()` al sitio ni se oculta contenido con `overflow: hidden` para simular el ajuste. Tablet y móvil mantienen el flujo vertical normal.

`scripts/measure-viewport.mjs` comprueba las cinco rutas en diez tamaños CSS de ventana (50 combinaciones), registra `scrollHeight`, `scrollWidth` y posición del marco en `design/viewport-qa/results.json`, y guarda capturas. En las áreas útiles de 1920×936, 1600×756 y 1536×720 las cinco vistas caben completas. En ventanas más bajas, Sobre mí y Blog pueden desplazar verticalmente para mantener la legibilidad. La zona visible real del navegador puede ser menor que la resolución física del monitor; el script prueba ambas.
