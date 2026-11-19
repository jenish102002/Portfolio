import { useEffect } from 'react'

// Fades [data-reveal] elements in as they scroll into view. Content is visible by
// default; the hidden starting state only applies once <html> has .reveal-ready.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) return
    document.documentElement.classList.add('reveal-ready')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    // Safety net: never leave on-screen content hidden.
    const t = setTimeout(() => {
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in')
      })
    }, 1500)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [])
}
