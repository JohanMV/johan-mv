export type Article = { id: string; title: string; category: string; image: string; alt: string; url: string | null; date: string | null; readingMinutes: number | null }
export const articles: Article[] = [
  { id: 'ia-salud', title: 'Inteligencia artificial en la detección temprana del cáncer de mama: Avances, precisión y desafíos', category: 'Ciencia', image: '/images/medical.webp', alt: 'Investigación y tecnología en un laboratorio', url: 'https://medium.com/@johan.mv/c%C3%B3mo-la-ia-est%C3%A1-salvando-vidas-detecci%C3%B3n-temprana-del-c%C3%A1ncer-de-mama-e45d45a58495', date: null, readingMinutes: null },
  { id: 'rag', title: 'Sistemas RAG empresariales: Arquitectura, recuperación semántica y desafíos', category: 'RAG', image: '/images/laptop.webp', alt: 'Ordenador portátil en un escritorio', url: null, date: null, readingMinutes: null },
  { id: 'ia-ciberseguridad', title: 'La IA en la Ciberseguridad: Aliada y Amenaza en el Mundo Digital', category: 'Ciberseguridad', image: '/images/server.webp', alt: 'Pasillo de servidores de un centro de datos', url: null, date: null, readingMinutes: null },
  { id: 'dualidad', title: 'Ciberseguridad e Inteligencia Artificial: Análisis de la Dualidad Ofensiva y Defensiva', category: 'Ciberseguridad', image: '/images/code.webp', alt: 'Código de programación en una pantalla', url: null, date: null, readingMinutes: null },
]
