import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const KEY = 'theme'

function readTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#09090b' : '#fafafa')
  try {
    localStorage.setItem(KEY, theme)
  } catch {}
  window.dispatchEvent(new Event('themechange'))
}

// Light by default; the choice is remembered. index.html applies the saved theme before first paint.
export function useTheme() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Switch with a circular reveal from the toggle button where the View Transitions API exists.
  const toggle = useCallback((e) => {
    const next = readTheme() === 'light' ? 'dark' : 'light'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      setTheme(next)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const vt = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.22, 0.8, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }, [])

  return [theme, toggle]
}
