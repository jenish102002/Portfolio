import { useEffect, useRef } from 'react'

const LABELS = [
  'RAG', 'LangGraph', 'LangChain', 'Qdrant', 'FAISS', 'FastAPI', 'Python', 'Embeddings',
  'MMR', 'Hybrid Search', 'PyTorch', 'Hugging Face', 'OpenAI', 'Claude', 'Gemini', 'Ollama',
  'Docker', 'AWS EC2', 'React', 'Multi-Agent', 'Prompt Eng.', 'Tool Use', 'SQL',
  'GitHub Actions', 'Scikit-learn', 'Streamlit', 'Chunking', 'LLMs',
]

// Evenly spread n points over a unit sphere.
function fibonacciSphere(n) {
  const pts = []
  const g = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    pts.push([Math.cos(g * i) * r, y, Math.sin(g * i) * r])
  }
  return pts
}

const DOTS = fibonacciSphere(240)
const TAGS = fibonacciSphere(LABELS.length).map((p, i) => ({ p, text: LABELS[i] }))
const PALETTES = {
  light: { line: '99, 91, 255', dotFront: '79, 70, 229', dotBack: '139, 92, 246', pill: '255, 255, 255', pillStroke: '79, 70, 229', pillText: '#4338ca', label: '59, 63, 85' },
  dark: { line: '129, 140, 248', dotFront: '165, 180, 252', dotBack: '167, 139, 250', pill: '24, 24, 27', pillStroke: '129, 140, 248', pillText: '#c7d2fe', label: '212, 212, 216' },
}

// Neighbour pairs never change under rotation, so compute them once.
const PAIRS = []
for (let i = 0; i < DOTS.length; i++) {
  for (let j = i + 1; j < DOTS.length; j++) {
    const [a, b, c] = DOTS[i]
    const [d, e, f] = DOTS[j]
    if ((a - d) ** 2 + (b - e) ** 2 + (c - f) ** 2 < 0.07) PAIRS.push(i, j)
  }
}

// Lightweight 3D "embedding space" globe on a 2D canvas: no WebGL, no libraries.
export default function Globe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const auto = reduce ? 0 : 0.0032

    let w = 0
    let h = 0
    let ay = 0.6
    let ax = -0.35
    let vy = auto
    let vx = 0
    let dragging = false
    let lastX = 0
    let lastY = 0
    let raf = 0
    let onScreen = true
    const proj = new Float32Array(DOTS.length * 3)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const project = ([x, y, z], R, cx, cy, out, k) => {
      const cosY = Math.cos(ay)
      const sinY = Math.sin(ay)
      const cosX = Math.cos(ax)
      const sinX = Math.sin(ax)
      const x1 = x * cosY - z * sinY
      const z1 = x * sinY + z * cosY
      const y1 = y * cosX - z1 * sinX
      const z2 = y * sinX + z1 * cosX
      const s = 2.6 / (2.6 - z2)
      out[k] = cx + x1 * R * s
      out[k + 1] = cy + y1 * R * s
      out[k + 2] = (z2 + 1) / 2 // depth 0 (back) .. 1 (front)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const c = PALETTES[document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light']
      const R = Math.min(w, h) * 0.3
      const cx = w / 2
      const cy = h / 2

      for (let i = 0; i < DOTS.length; i++) project(DOTS[i], R, cx, cy, proj, i * 3)

      ctx.lineWidth = 1
      for (let k = 0; k < PAIRS.length; k += 2) {
        const a = PAIRS[k] * 3
        const b = PAIRS[k + 1] * 3
        const d = (proj[a + 2] + proj[b + 2]) / 2
        ctx.strokeStyle = `rgba(${c.line}, ${0.04 + d * d * 0.32})`
        ctx.beginPath()
        ctx.moveTo(proj[a], proj[a + 1])
        ctx.lineTo(proj[b], proj[b + 1])
        ctx.stroke()
      }

      for (let i = 0; i < DOTS.length; i++) {
        const k = i * 3
        const d = proj[k + 2]
        ctx.fillStyle = d > 0.5 ? `rgba(${c.dotFront}, ${0.3 + d * 0.7})` : `rgba(${c.dotBack}, ${0.15 + d * 0.5})`
        ctx.beginPath()
        ctx.arc(proj[k], proj[k + 1], 0.8 + d * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      const tags = TAGS.map((t) => {
        const o = [0, 0, 0]
        project(t.p.map((v) => v * 1.12), R, cx, cy, o, 0)
        return { text: t.text, x: o[0], y: o[1], d: o[2] }
      }).sort((a, b) => a.d - b.d)

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const t of tags) {
        const size = 10 + t.d * 5
        ctx.font = `${t.d > 0.7 ? 700 : 600} ${size}px Geist, system-ui, sans-serif`
        if (t.d > 0.72) {
          const tw = ctx.measureText(t.text).width + 16
          const th = size + 10
          ctx.fillStyle = `rgba(${c.pill}, ${0.9 * t.d})`
          ctx.strokeStyle = `rgba(${c.pillStroke}, ${0.35 * t.d})`
          ctx.beginPath()
          ctx.roundRect(t.x - tw / 2, t.y - th / 2, tw, th, th / 2)
          ctx.fill()
          ctx.stroke()
          ctx.fillStyle = c.pillText
        } else {
          ctx.fillStyle = `rgba(${c.label}, ${0.12 + t.d * 0.7})`
        }
        ctx.fillText(t.text, t.x, t.y + 0.5)
      }
    }

    const tick = () => {
      raf = 0
      if (!dragging) {
        vy += (auto - vy) * 0.03
        vx *= 0.94
        ax += (-0.35 - ax) * 0.01
      }
      ay += vy
      ax += vx
      draw()
      if (onScreen && !document.hidden) raf = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(tick)
    }

    const down = (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
      canvas.classList.add('is-grabbing')
    }
    const move = (e) => {
      if (!dragging) return
      vy = (e.clientX - lastX) * 0.006
      vx = (e.clientY - lastY) * 0.004
      lastX = e.clientX
      lastY = e.clientY
      start()
    }
    const up = () => {
      dragging = false
      canvas.classList.remove('is-grabbing')
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      start()
    })
    io.observe(canvas)
    document.addEventListener('visibilitychange', start)
    window.addEventListener('themechange', draw)
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)
    // Redraw once fonts arrive so labels use the right typeface.
    document.fonts?.ready.then(draw)
    start()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', start)
      window.removeEventListener('themechange', draw)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
    }
  }, [])

  return <canvas ref={canvasRef} className="globe" aria-label="Rotating 3D globe of Jenish's skills. Drag to spin." role="img" />
}
