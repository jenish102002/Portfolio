import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import { useTheme } from './useTheme.js'

const links = [
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Ask AI', 'ask'],
  ['Skills', 'skills'],
  ['Education', 'education'],
]

let scrollFrame = 0

// Own eased scroll instead of behavior: 'smooth', which some browsers drop when clicks come quickly.
export function scrollToY(target) {
  cancelAnimationFrame(scrollFrame)
  const start = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  const end = Math.max(0, Math.min(target, max))
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const duration = reduce ? 0 : Math.min(900, 300 + Math.abs(end - start) * 0.25)
  const t0 = performance.now()
  const step = (now) => {
    const p = duration ? Math.min(1, (now - t0) / duration) : 1
    const eased = 1 - Math.pow(1 - p, 3)
    window.scrollTo(0, start + (end - start) * eased)
    if (p < 1) scrollFrame = requestAnimationFrame(step)
  }
  scrollFrame = requestAnimationFrame(step)
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  scrollToY(el.getBoundingClientRect().top + window.scrollY - 84)
  history.replaceState(null, '', `#${id}`)
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [theme, toggleTheme] = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      let current = ''
      for (const [, id] of links) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 140) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = links[links.length - 1][1]
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner">
        <a
          href="#top"
          className="brand"
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            scrollToY(0)
          }}
        >
          <span className="brand__mark">JP</span>
          <span className="brand__name">Jenish Patel</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={(e) => go(e, id)}>
              {label}
            </a>
          ))}
          <a className="btn btn--primary nav__cta-mobile" href={`mailto:${profile.email}`}>
            Email me
          </a>
        </nav>

        <div className="nav__right">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <a className="btn btn--primary btn--sm nav__cta" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
