import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: reduced ? 0 : .35, delay: reduced ? 0 : delay, ease: 'easeOut' }}>{children}</motion.div>
}
export function Panel({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}><span className="panel-tab" aria-hidden="true"><i /><i /><i /></span><h2>{title}</h2>{children}</section>
}
export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (nueva pestaña)</span></a>
}
export function Arrow() { return <ArrowRight size={23} strokeWidth={1.8} aria-hidden="true" /> }
export function CutPhoto({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <div className={`cut-photo ${className}`}><img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} /></div>
}
