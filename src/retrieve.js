import { chunks } from './data.js'

const STOP = new Set(
  'a an the is are was were do does did you your i me my to of in on for at and or what which how who tell about can with have has it this that'.split(' '),
)

export const THRESHOLD = 0.6

function tokenize(q) {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t))
}

// Toy lexical retriever: prefix-matched keyword hits, squashed into a 0..1 "similarity".
export function retrieve(query, k = 3) {
  const tokens = tokenize(query)
  const scored = chunks.map((c) => {
    let hits = 0
    for (const t of tokens) {
      if (c.keys.some((key) => key === t || (t.length > 3 && (key.startsWith(t) || t.startsWith(key))))) hits++
    }
    const coverage = tokens.length ? hits / tokens.length : 0
    const score = Math.min(0.97, 0.18 + 0.32 * hits + 0.3 * coverage)
    return { ...c, score: hits ? score : 0.08 + Math.random() * 0.14 }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, k)
}
