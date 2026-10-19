import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { UserRound, PawPrint, Dumbbell, FlaskConical } from 'lucide-react'
import { gallery, categories, type Category } from '../data/gallery'
import Lightbox from '../components/Lightbox'
import { Reveal } from '../components/UI'
const icons = { Yo: UserRound, Mascotas: PawPrint, Deporte: Dumbbell, Ciencia: FlaskConical }
export default function Gallery() {
  const [category, setCategory] = useState<Category | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const reduced = useReducedMotion()
  const photos = category ? gallery.filter(p => p.category === category).slice(0, 7) : [gallery[0], gallery[2], gallery[4], gallery[1], gallery[6]]
  return <><Reveal className="gallery-heading"><h1>GALERÍA</h1><div className="gallery-intro"><p>Un vistazo a las cosas que forman parte de mi día a día y me inspiran.</p><span className="accent-stroke" /></div><div className="filters" role="group" aria-label="Filtrar fotografías">{categories.map(c => { const Icon = icons[c]; return <button key={c} aria-pressed={category === c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}><Icon size={26} />{c}</button> })}</div></Reveal><div className="gallery-toolbar"><p aria-live="polite">{category ? `${category} · ${photos.length} fotografías` : 'Una selección de mi mundo'}</p>{category && <button className="text-link" onClick={() => setCategory(null)}>Ver selección completa</button>}</div><motion.div layout={!reduced} className={`gallery-grid ${category ? 'is-filtered' : ''}`}><AnimatePresence mode="popLayout">{photos.map((photo, i) => { const Icon = icons[photo.category]; return <motion.button layout={!reduced} key={photo.id} className="gallery-tile" onClick={() => setSelected(i)} aria-label={`Ampliar: ${photo.alt}`} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : .99 }} transition={{ duration: reduced ? 0 : .28 }}><img src={photo.src} alt={photo.alt} loading={i < 3 ? 'eager' : 'lazy'} /><span className="photo-label"><Icon size={23} />{photo.category}</span></motion.button> })}</AnimatePresence></motion.div><p className="image-credit">Fotos personales: Johan MV. Inspiración visual: Unsplash. <a href="/image-credits.txt" target="_blank" rel="noopener noreferrer">Créditos de imágenes</a></p><AnimatePresence>{selected !== null && <Lightbox photos={photos} index={selected} onIndex={setSelected} onClose={() => setSelected(null)} />}</AnimatePresence></>
}
