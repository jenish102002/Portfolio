import { useEffect } from 'react'

// One delegated listener drives the 3D tilt of every [data-tilt] element.
// Updates are batched to one per animation frame; disabled on touch and reduced motion.
export function useTilt() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    let el = null
    let ev = null
    let raf = 0

    const reset = (node) => {
      node.classList.remove('is-tilting')
      node.style.setProperty('--rx', '0deg')
      node.style.setProperty('--ry', '0deg')
    }

    const apply = () => {
      raf = 0
      if (!el || !ev) return
      const r = el.getBoundingClientRect()
      const px = (ev.clientX - r.left) / r.width
      const py = (ev.clientY - r.top) / r.height
      const max = Number(el.dataset.tilt) || 8
      el.style.setProperty('--rx', `${((0.5 - py) * max).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${((px - 0.5) * max).toFixed(2)}deg`)
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
    }

    const move = (e) => {
      const target = e.target.closest ? e.target.closest('[data-tilt]') : null
      if (target !== el) {
        if (el) reset(el)
        el = target
        if (el) el.classList.add('is-tilting')
      }
      ev = e
      if (el && !raf) raf = requestAnimationFrame(apply)
    }

    const leave = (e) => {
      if (!e.relatedTarget && el) {
        reset(el)
        el = null
      }
    }

    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('mouseout', leave)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('pointermove', move)
      document.removeEventListener('mouseout', leave)
    }
  }, [])
}
