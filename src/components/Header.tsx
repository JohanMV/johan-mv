import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
export const routes = [{ path: '/', label: 'Inicio' }, { path: '/sobre-mi', label: 'Sobre mí' }, { path: '/galeria', label: 'Galería' }, { path: '/blog', label: 'Blog' }, { path: '/contacto', label: 'Contacto' }]
export default function Header() {
  const [open, setOpen] = useState(false)
  return <header className="header"><Link to="/" className="wordmark" aria-label="Johan MV, inicio" onClick={() => setOpen(false)}>Johan MV<span /></Link><button className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="main-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal">{routes.map(route => <NavLink key={route.path} to={route.path} end onClick={() => setOpen(false)}>{({ isActive }) => <>{route.label}{isActive && <motion.span className="nav-indicator" layoutId="active-nav" transition={{ duration: .25, ease: 'easeOut' }} />}</>}</NavLink>)}</nav></header>
}
