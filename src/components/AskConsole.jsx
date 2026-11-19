import { useEffect, useRef, useState } from 'react'
import { retrieve, THRESHOLD } from '../retrieve.js'
import { presetQueries, profile } from '../data.js'
import { SparkIcon } from './Icons.jsx'

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A small simulation of the RAG flow I build: retrieve → score → gate → stream (or escalate).
export default function AskConsole() {
  const [query, setQuery] = useState('')
  const [phase, setPhase] = useState('idle') // idle | retrieving | answering | done | escalated
  const [hits, setHits] = useState([])
  const [answer, setAnswer] = useState('')
  const [asked, setAsked] = useState('')
  const timers = useRef([])

  const clear = () => {
    timers.current.forEach((t) => {
      clearTimeout(t)
      clearInterval(t)
    })
    timers.current = []
  }
  useEffect(() => clear, [])

  const busy = phase === 'retrieving' || phase === 'answering'

  const ask = (q) => {
    const text = q.trim()
    if (!text || busy) return
    clear()
    setAsked(text)
    setQuery('')
    setAnswer('')
    setHits([])
    setPhase('retrieving')

    const results = retrieve(text)
    const fast = reduceMotion()
    timers.current.push(
      setTimeout(() => {
        setHits(results)
        const top = results[0]
        if (top.score < THRESHOLD) {
          setPhase('escalated')
          return
        }
        if (fast) {
          setAnswer(top.answer)
          setPhase('done')
          return
        }
        setPhase('answering')
        const words = top.answer.split(' ')
        let i = 0
        const iv = setInterval(() => {
          i++
          setAnswer(words.slice(0, i).join(' '))
          if (i >= words.length) {
            clearInterval(iv)
            setPhase('done')
          }
        }, 30)
        timers.current.push(iv)
      }, fast ? 0 : 650),
    )
  }

  const top = hits[0]

  return (
    <div className="ask">
      <div className="ask__head">
        <span className="ask__icon">
          <SparkIcon />
        </span>
        <div>
          <h2>Resume assistant</h2>
          <p>Answers only from retrieved resume chunks.</p>
        </div>
      </div>

      <div className="ask__body" aria-live="polite">
        {phase === 'idle' && (
          <div className="ask__empty">
            <p>Pick a question below or type your own.</p>
            <p className="small muted">
              If the match confidence is under {THRESHOLD}, it won’t guess. That’s the same rule I shipped at Intel.
            </p>
          </div>
        )}

        {phase !== 'idle' && (
          <>
            <div className="bubble bubble--q">{asked}</div>

            <div className="sources">
              <span className="small muted">{phase === 'retrieving' ? 'Searching resume…' : 'Top matches'}</span>
              {phase === 'retrieving'
                ? [0, 1, 2].map((i) => <div key={i} className="source source--loading" />)
                : hits.map((h) => (
                    <div key={h.id} className={`source ${h.score >= THRESHOLD ? 'is-pass' : ''}`}>
                      <span className="source__name">{h.source}</span>
                      <span className="meter">
                        <span style={{ width: `${Math.round(h.score * 100)}%` }} />
                      </span>
                      <span className="source__score">{h.score.toFixed(2)}</span>
                    </div>
                  ))}
            </div>

            {(phase === 'answering' || phase === 'done') && (
              <div className="bubble bubble--a">
                {answer}
                {phase === 'answering' && <span className="caret" />}
              </div>
            )}

            {phase === 'escalated' && (
              <div className="bubble bubble--warn">
                <strong>
                  Confidence {top.score.toFixed(2)} is below {THRESHOLD}, so I won’t guess.
                </strong>
                <span>Ask me directly instead:</span>
                <a className="btn btn--primary btn--sm" href={`mailto:${profile.email}?subject=${encodeURIComponent(asked)}`}>
                  Email Jenish
                </a>
              </div>
            )}
          </>
        )}
      </div>

      <div className="ask__presets">
        {presetQueries.map((p) => (
          <button key={p} type="button" className="preset" onClick={() => ask(p)} disabled={busy}>
            {p}
          </button>
        ))}
      </div>

      <form
        className="ask__input"
        onSubmit={(e) => {
          e.preventDefault()
          ask(query)
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about Intel, DocMind, LangGraph…"
          aria-label="Ask a question about Jenish"
        />
        <button type="submit" className="btn btn--primary btn--sm" disabled={!query.trim() || busy}>
          Ask
        </button>
      </form>
    </div>
  )
}
