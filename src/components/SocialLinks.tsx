import { socialLinks } from '../data/socialLinks'
import { ExternalLink, Arrow } from './UI'
const socials = [{ key: 'linkedin', name: 'LinkedIn', handle: '/johan-mv' }, { key: 'medium', name: 'Medium', handle: '@johan.mv' }, { key: 'instagram', name: 'Instagram', handle: '@johan.mvx' }, { key: 'spotify', name: 'Spotify', handle: 'Johan MV' }] as const
export function BrandIcon({ brand }: { brand: string }) {
  return <span className={`brand-icon ${brand}`} aria-hidden="true"><img src={`/images/${brand}.svg`} alt="" /></span>
}
export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className={`social-grid ${compact ? 'compact' : ''}`}>{socials.map(s => <ExternalLink key={s.key} href={socialLinks[s.key]} className="social-card"><BrandIcon brand={s.key} /><span><strong>{s.name}</strong>{!compact && <small>{s.handle}</small>}</span><Arrow /></ExternalLink>)}</div>
}
