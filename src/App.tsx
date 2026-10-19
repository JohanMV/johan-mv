import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Header, { routes } from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
export default function App() {
  const location = useLocation()
  const reduced = useReducedMotion()
  const first = useRef(true)
  const main = useRef<HTMLElement>(null)
  useEffect(() => {
    document.title = `${routes.find(r => r.path === location.pathname)?.label ?? 'Página no encontrada'} — Johan MV`
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (!first.current) main.current?.focus({ preventScroll: true })
    first.current = false
  }, [location.pathname])
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><div className="site-frame"><Header /><main id="contenido" ref={main} tabIndex={-1}><AnimatePresence mode="popLayout" initial={false}><motion.div key={location.pathname} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -4 }} transition={{ duration: reduced ? 0 : .22, ease: 'easeOut' }}><Routes location={location}><Route path="/" element={<Home />} /><Route path="/sobre-mi" element={<About />} /><Route path="/galeria" element={<Gallery />} /><Route path="/blog" element={<Blog />} /><Route path="/contacto" element={<Contact />} /><Route path="*" element={<div className="not-found"><h1>POR AQUÍ NO ERA</h1><p>Esta página no existe, pero hay mucho por descubrir.</p><Link className="button yellow" to="/">Volver al inicio</Link></div>} /></Routes></motion.div></AnimatePresence></main></div></>
}
