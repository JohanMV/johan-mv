import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Photo } from '../data/gallery'
export default function Lightbox({ photos, index, onIndex, onClose }: { photos: Photo[]; index: number; onIndex: (index: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const reduced = useReducedMotion()
  const photo = photos[index]
  const move = (offset: number) => onIndex((index + offset + photos.length) % photos.length)
  useEffect(() => {
    const element = dialog.current!
    const previousFocus = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus() }
  }, [])
  return <motion.dialog ref={dialog} className="lightbox" aria-label="Fotografía ampliada" onCancel={e => { e.preventDefault(); onClose() }} onClick={e => { if (e.target === e.currentTarget) onClose() }} onKeyDown={e => { if (e.key === 'ArrowLeft') move(-1); if (e.key === 'ArrowRight') move(1) }} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }}><button className="lightbox-close icon-button" aria-label="Cerrar imagen" onClick={onClose} autoFocus><X /></button><button className="lightbox-prev icon-button" aria-label="Imagen anterior" onClick={() => move(-1)}><ChevronLeft /></button><figure><motion.img key={photo.id} src={photo.src} alt={photo.alt} initial={{ opacity: reduced ? 1 : .3 }} animate={{ opacity: 1 }} transition={{ duration: .2 }} /><figcaption aria-live="polite"><strong>{photo.caption}</strong><span>{index + 1} / {photos.length}{photo.credit ? ` · ${photo.credit}` : ' · Johan MV'}</span></figcaption></figure><button className="lightbox-next icon-button" aria-label="Imagen siguiente" onClick={() => move(1)}><ChevronRight /></button></motion.dialog>
}
