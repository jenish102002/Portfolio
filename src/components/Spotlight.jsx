import { useEffect, useRef } from 'react'

// Soft glow that follows the cursor across the whole page.
// It moves one pre-rendered layer with translate3d (GPU-composited), so nothing repaints per frame.
export default function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!fine || reduce || !el) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 3
    let cx = x
    let cy = y
    let raf = 0
    let last = 0

    const tick = (now) => {
      // Ease toward the pointer; time-based so the trail feels the same at any frame rate.
      const dt = last ? Math.min(now - last, 100) : 16.7
      last = now
      const k = 1 - Math.pow(0.82, dt / 16.7)
      cx += (x - cx) * k
      cy += (y - cy) * k
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      if (Math.abs(x - cx) > 0.3 || Math.abs(y - cy) > 0.3) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
        last = 0
      }
    }
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      el.classList.add('is-on')
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const leave = (e) => {
      if (!e.relatedTarget) el.classList.remove('is-on')
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('mouseout', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseout', leave)
    }
  }, [])

  return (
    <div className="spotlight" aria-hidden="true">
      <div ref={ref} className="spotlight__glow" />
    </div>
  )
}
