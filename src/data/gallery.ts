export const categories = ['Yo', 'Mascotas', 'Deporte', 'Ciencia'] as const
export type Category = typeof categories[number]
export type Photo = { id: string; src: string; alt: string; category: Category; caption: string; credit?: string }
export const gallery: Photo[] = [
  { id: 'johan-cumple', src: '/images/johan-cumple.webp', alt: 'Johan tomando una fotografía frente al espejo', category: 'Yo', caption: 'Un momento para recordar' },
  { id: 'johan-campus', src: '/images/johan-campus.webp', alt: 'Johan junto a una escultura roja al aire libre', category: 'Yo', caption: 'Entre paseos y recuerdos' },
  { id: 'cat', src: '/images/cat.webp', alt: 'Gato descansando plácidamente', category: 'Mascotas', caption: 'La calma de las pequeñas cosas', credit: 'Unsplash' },
  { id: 'dog', src: '/images/dog.webp', alt: 'Perro disfrutando del aire libre', category: 'Mascotas', caption: 'La mejor compañía', credit: 'Unsplash' },
  { id: 'gym', src: '/images/gym.webp', alt: 'Pesas en un gimnasio', category: 'Deporte', caption: 'Un poco mejor cada día', credit: 'Unsplash' },
  { id: 'basket', src: '/images/basket.webp', alt: 'Cancha de baloncesto', category: 'Deporte', caption: 'Tiempo de desconectar', credit: 'Unsplash' },
  { id: 'lab', src: '/images/lab.webp', alt: 'Material de investigación científica', category: 'Ciencia', caption: 'La curiosidad como punto de partida', credit: 'Unsplash' },
  { id: 'space', src: '/images/space.webp', alt: 'Cielo nocturno lleno de estrellas', category: 'Ciencia', caption: 'Siempre hay algo por descubrir', credit: 'Unsplash' },
]
